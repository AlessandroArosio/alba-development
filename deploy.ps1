# ============================================================
#  Alba Development - Deployment Script
#  Target : https://albadevelopment.co.uk  (Cloudflare Tunnel)
#  Pi     : ssh alessandro@pi
#
#  Every Pi-touching step requires [y/N] approval.
#  Run from the project root: .\deploy.ps1
# ============================================================

$ErrorActionPreference = "Stop"

$PI_HOST    = "alessandro@pi"
$APP_NAME   = "alba-development"
$REMOTE_DIR = "/var/www/$APP_NAME"
# Port nginx serves on locally. Cloudflare Tunnel points here.
# Change if already in use - script checks automatically.
$SERVE_PORT = 8083

# ---- Helpers -----------------------------------------------------------------

function Write-Step([string]$msg)  { Write-Host ""; Write-Host "---  $msg  ---" -ForegroundColor Cyan }
function Write-Info([string]$msg)  { Write-Host "  $msg" -ForegroundColor Gray }
function Write-Ok([string]$msg)    { Write-Host "  OK: $msg" -ForegroundColor Green }
function Write-Warn([string]$msg)  { Write-Host "  !!: $msg" -ForegroundColor Yellow }
function Write-Err([string]$msg)   { Write-Host "  XX: $msg" -ForegroundColor Red }

function Approve([string]$description) {
    Write-Host ""
    Write-Host "  > $description" -ForegroundColor White
    $ans = Read-Host "    Run this? [y/N]"
    return ($ans -match '^[Yy]$')
}

function Run-SSH([string]$cmd, [string]$desc) {
    Write-Info "Command: $cmd"
    if (-not (Approve $desc)) { Write-Warn "Skipped."; return $null }
    $out = ssh $PI_HOST $cmd 2>&1
    Write-Host $out -ForegroundColor DarkGray
    return $out
}

# ---- PHASE 1 : Local build ---------------------------------------------------

Write-Step "PHASE 1 - Build production bundle (local)"

if (-not (Approve "Run 'npm run build' to produce ./dist")) {
    Write-Err "Aborted."; exit 1
}

Push-Location $PSScriptRoot
try {
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "npm run build failed" }
} finally { Pop-Location }

Write-Ok "dist/ is ready."

# ---- PHASE 2 : Inspect Pi (read-only) ----------------------------------------

Write-Step "PHASE 2 - Inspect Pi (read-only - nothing will be changed)"

if (-not (Approve "SSH to the Pi and inspect listening ports + nginx config")) {
    Write-Err "Cannot safely deploy without inspecting the Pi first."; exit 1
}

Write-Host ""
Write-Host "  [Listening ports]" -ForegroundColor Yellow
$ports = ssh $PI_HOST "ss -tlnp 2>/dev/null" 2>&1
Write-Host $ports -ForegroundColor DarkGray

Write-Host ""
Write-Host "  [nginx version]" -ForegroundColor Yellow
ssh $PI_HOST "nginx -v 2>&1" 2>&1 | Write-Host -ForegroundColor DarkGray

Write-Host ""
Write-Host "  [nginx -T (first 80 lines)]" -ForegroundColor Yellow
ssh $PI_HOST "sudo nginx -T 2>&1 | head -80" 2>&1 | Write-Host -ForegroundColor DarkGray

# Check target port is free
if ($ports -match ":$SERVE_PORT ") {
    Write-Err "Port $SERVE_PORT is already in use on the Pi!"
    Write-Err "Edit `$SERVE_PORT at the top of this script and re-run."
    exit 1
} else {
    Write-Ok "Port $SERVE_PORT is free."
}

Write-Host ""
$cont = Read-Host "  Review the output above. Continue with deployment? [y/N]"
if ($cont -notmatch '^[Yy]$') {
    Write-Warn "Deployment paused. Re-run when ready."; exit 0
}

# ---- PHASE 3 : Upload dist/ --------------------------------------------------
#
# Uses a staging directory so the webroot is never in a partially-updated state.
# Pattern mirrors deploy.js: scp dist → ~/staging, then atomic sudo cp → webroot.

Write-Step "PHASE 3 - Upload static files to the Pi (atomic via staging dir)"

$STAGING_DIR = "~/alba-dev-dist-deploy"

if (Approve "Upload ./dist/ to Pi staging dir, then atomically replace $REMOTE_DIR") {
    # Ensure clean staging dir
    ssh $PI_HOST "rm -rf $STAGING_DIR" 2>&1 | Out-Null

    # scp the whole dist/ folder as the staging dir
    scp -r "$PSScriptRoot\dist" "${PI_HOST}:${STAGING_DIR}"
    if ($LASTEXITCODE -ne 0) { throw "scp upload failed" }
    Write-Ok "Files uploaded to staging."

    # Atomic swap: clear webroot, copy staged files, fix perms, clean up staging
    ssh $PI_HOST (
        "sudo mkdir -p $REMOTE_DIR && " +
        "sudo rm -rf ${REMOTE_DIR}/* && " +
        "sudo cp -r ${STAGING_DIR}/* ${REMOTE_DIR}/ && " +
        "sudo chown -R www-data:www-data $REMOTE_DIR && " +
        "sudo chmod -R 755 $REMOTE_DIR && " +
        "sudo find $REMOTE_DIR -type f -exec chmod 644 {} \; && " +
        "rm -rf $STAGING_DIR && " +
        "echo deploy-complete"
    ) 2>&1 | Write-Host -ForegroundColor DarkGray
    Write-Ok "Files live at $REMOTE_DIR (www-data owned, 755/644)."
}

# ---- PHASE 4 : Inject server block into nginx.conf --------------------------
#
# IMPORTANT: This Pi uses a monolithic /etc/nginx/nginx.conf with all server
# blocks defined inline. The sites-enabled/ directory exists on disk but is
# NOT referenced by an include directive in nginx.conf, so files placed there
# have NO effect. We inject our block directly into nginx.conf.
# The injection is IDEMPOTENT - re-running will detect the block already exists.

Write-Step "PHASE 4 - Configure nginx"

# Show the server block that will be injected
$blockPreview = @"
    # Alba Development - albadevelopment.co.uk (port $SERVE_PORT via Cloudflare Tunnel)
    server {
        listen $SERVE_PORT;
        server_name _;
        root $REMOTE_DIR;
        index index.html;

        add_header X-Frame-Options        "SAMEORIGIN"                      always;
        add_header X-Content-Type-Options "nosniff"                         always;
        add_header Referrer-Policy        "strict-origin-when-cross-origin" always;

        location ~* .(js|css|webp|jpg|jpeg|png|svg|ico|woff2|woff|ttf) {
            expires 1y;
            add_header Cache-Control "public, immutable";
            access_log off;
        }
        location / { try_files `$uri `$uri/ /index.html; }
        location ~ /. { deny all; }
    }
"@
Write-Host ""
Write-Host "  --- server block to be injected into /etc/nginx/nginx.conf ---" -ForegroundColor Yellow
Write-Host $blockPreview -ForegroundColor DarkGray
Write-Host "  ---------------------------------------------------------------" -ForegroundColor Yellow

# Check if block is already present
$alreadyPresent = (ssh $PI_HOST "grep -c 'alba-development' /etc/nginx/nginx.conf 2>/dev/null || echo 0").Trim()
if ($alreadyPresent -ne "0") {
    Write-Ok "Server block already present in nginx.conf - skipping injection."
} else {
    if (Approve "Backup nginx.conf then inject the server block above into /etc/nginx/nginx.conf") {
        # 1. Backup
        ssh $PI_HOST "sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak" 2>&1 | Out-Null
        Write-Ok "Backup saved to /etc/nginx/nginx.conf.bak"

        # 2. Build a clean Python file locally and scp it (avoids all SSH quoting issues)
        $pyInject = @'
f = open("/etc/nginx/nginx.conf")
content = f.read()
f.close()

block = """
    # Alba Development - albadevelopment.co.uk - port SERVE_PORT_TOKEN (Cloudflare Tunnel)
    server {
        listen SERVE_PORT_TOKEN;
        server_name _;

        root REMOTE_DIR_TOKEN;
        index index.html;

        add_header X-Frame-Options        "SAMEORIGIN"                      always;
        add_header X-Content-Type-Options "nosniff"                         always;
        add_header Referrer-Policy        "strict-origin-when-cross-origin" always;

        location ~* \.(js|css|webp|jpg|jpeg|png|svg|ico|woff2|woff|ttf)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            access_log off;
        }

        location / {
            try_files $uri $uri/ /index.html;
        }

        location ~ /\. {
            deny all;
        }
    }
"""

idx = content.rfind("}")
new_content = content[:idx] + block + content[idx:]

f = open("/etc/nginx/nginx.conf", "w")
f.write(new_content)
f.close()
print("Injected OK")
'@
        # Replace tokens with actual values
        $pyInject = $pyInject.Replace("SERVE_PORT_TOKEN", $SERVE_PORT).Replace("REMOTE_DIR_TOKEN", $REMOTE_DIR)

        $tmpPy = [System.IO.Path]::GetTempFileName() + ".py"
        [System.IO.File]::WriteAllText($tmpPy, $pyInject, [System.Text.Encoding]::ASCII)
        scp $tmpPy "${PI_HOST}:/tmp/inject_alba_development.py"
        Remove-Item $tmpPy

        $result = ssh $PI_HOST "sudo python3 /tmp/inject_alba_development.py ; sudo rm /tmp/inject_alba_development.py" 2>&1
        Write-Host $result -ForegroundColor DarkGray
        if ($result -notmatch "Injected OK") { throw "Python injection failed: $result" }
        Write-Ok "Server block injected into /etc/nginx/nginx.conf"
    }
}

# ---- PHASE 5 : Update cloudflared config ------------------------------------
#
# The cloudflared-config.yml in edi-frontend-platform/infrastructure/ is the
# single source of truth for all tunnel ingress rules (already includes
# albadevelopment.co.uk → localhost:8083).

Write-Step "PHASE 5 - Update cloudflared config on Pi"

$CLOUDFLARED_CONF = (Resolve-Path "$PSScriptRoot\..\edi-frontend-platform\infrastructure\cloudflared-config.yml").Path

if (-not (Test-Path $CLOUDFLARED_CONF)) {
    Write-Err "cloudflared-config.yml not found at: $CLOUDFLARED_CONF"
    Write-Err "Make sure edi-frontend-platform is at the same level as alba-development."
    exit 1
}

Write-Info "Config: $CLOUDFLARED_CONF"

if (Approve "SCP cloudflared-config.yml to Pi, apply it, and restart cloudflared") {
    scp $CLOUDFLARED_CONF "${PI_HOST}:~/.cloudflared/config.yml"
    if ($LASTEXITCODE -ne 0) { throw "scp of cloudflared config failed" }

    ssh $PI_HOST "sudo cp ~/.cloudflared/config.yml /etc/cloudflared/config.yml && sudo systemctl restart cloudflared && sleep 3 && systemctl is-active cloudflared && echo cloudflared-restarted" 2>&1 | Write-Host -ForegroundColor DarkGray
    Write-Ok "cloudflared config updated and service restarted."
    Write-Warn "DNS records required in Cloudflare dashboard (if not already added):"
    Write-Warn "  CNAME  www  ->  0732aa67-f1c7-4771-bcac-b9c5b6c4a81e.cfargotunnel.com  (Proxied)"
    Write-Warn "  CNAME  @    ->  0732aa67-f1c7-4771-bcac-b9c5b6c4a81e.cfargotunnel.com  (Proxied)"
}

# ---- PHASE 6 : Test and reload nginx -----------------------------------------

Write-Step "PHASE 6 - Test and reload nginx"

# NOTE: 'nginx -t' writes its output to stderr even on success.
# We merge stderr+stdout and check the text instead of relying on exit code.
Write-Info "Command: sudo nginx -t"
if (Approve "Test nginx config for syntax errors (safe - does NOT reload)") {
    $testOut = ssh $PI_HOST "sudo nginx -t 2>&1"
    Write-Host $testOut -ForegroundColor DarkGray
    if ($testOut -notmatch "syntax is ok") {
        Write-Err "nginx config test FAILED. Restoring backup..."
        ssh $PI_HOST "sudo cp /etc/nginx/nginx.conf.bak /etc/nginx/nginx.conf ; sudo systemctl reload nginx" 2>&1 | Out-Null
        Write-Err "Backup restored. No changes applied. Please fix the config and re-run."
        exit 1
    }
    Write-Ok "nginx config is valid."
}

Run-SSH "sudo systemctl reload nginx" `
    "Reload nginx (graceful zero-downtime reload - preserves existing connections)"

# ---- PHASE 7 : Smoke test ----------------------------------------------------

Write-Step "PHASE 7 - Smoke test"

Run-SSH "curl -sI http://localhost:$SERVE_PORT/ | head -10" `
    "Curl the site locally on the Pi - expect HTTP 200"

# ---- Done --------------------------------------------------------------------

Write-Host ""
Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Green
Write-Host "  |  Deployment complete!                                     |" -ForegroundColor Green
Write-Host "  |                                                           |" -ForegroundColor Green
Write-Host "  |  Site live at: http://pi:$SERVE_PORT                         |" -ForegroundColor Green
Write-Host "  |                                                           |" -ForegroundColor Green
Write-Host "  |  Cloudflare Tunnel - add a Public Hostname:              |" -ForegroundColor Green
Write-Host "  |    Subdomain : (root or www)                             |" -ForegroundColor Green
Write-Host "  |    Domain    : albadevelopment.co.uk                     |" -ForegroundColor Green
Write-Host "  |    Type      : HTTP                                      |" -ForegroundColor Green
Write-Host "  |    URL       : localhost:$SERVE_PORT                         |" -ForegroundColor Green
Write-Host "  +-----------------------------------------------------------+" -ForegroundColor Green
Write-Host ""
