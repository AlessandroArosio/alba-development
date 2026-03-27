import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build, loadConfigFromFile } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.resolve(rootDir, 'dist')
const serverDir = path.resolve(distDir, 'server')

const routes = [
  {
    path: '/',
    title: 'Alba Development | Web &amp; Mobile App Development Edinburgh, Scotland',
    description:
      'Web &amp; mobile app development from Edinburgh, Scotland. Custom React, React Native and AI-powered solutions for ambitious businesses across the UK and Scotland.',
    canonical: 'https://www.albadevelopment.co.uk/',
    outFile: path.resolve(distDir, 'index.html'),
  },
  {
    path: '/services',
    title: 'Web &amp; Mobile App Development Services | Alba Development Edinburgh',
    description:
      'Custom web applications, React Native mobile apps, AI integration and data analytics services from Edinburgh, Scotland. Enterprise-grade quality for ambitious businesses.',
    canonical: 'https://www.albadevelopment.co.uk/services',
    outFile: path.resolve(distDir, 'services/index.html'),
  },
  {
    path: '/portfolio',
    title: 'Selected Work &amp; Case Studies | Alba Development Edinburgh',
    description:
      'Explore real-world web and mobile applications built by Alba Development. From Airbnb analytics engines to AI-powered concierge platforms and native mobile apps.',
    canonical: 'https://www.albadevelopment.co.uk/portfolio',
    outFile: path.resolve(distDir, 'portfolio/index.html'),
  },
  {
    path: '/contact',
    title: 'Get in Touch | Free Consultation | Alba Development Edinburgh',
    description:
      'Ready to build your web or mobile app? Get a free 30-minute consultation with Alba Development. Based in Edinburgh, working with clients across Scotland and the UK.',
    canonical: 'https://www.albadevelopment.co.uk/contact',
    outFile: path.resolve(distDir, 'contact/index.html'),
  },
]

async function prerender() {
  console.log('Building SSR bundle...')

  const configResult = await loadConfigFromFile(
    { command: 'build', mode: 'production' },
    path.resolve(rootDir, 'vite.config.js'),
    rootDir,
  )

  await build({
    logLevel: 'warn',
    ...configResult?.config,
    build: {
      ...(configResult?.config?.build ?? {}),
      ssr: true,
      rollupOptions: {
        input: path.resolve(rootDir, 'src/entry-server.jsx'),
      },
      outDir: serverDir,
    },
  })

  const baseTemplate = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8')

  const placeholder = '<div id="root"></div>'
  if (!baseTemplate.includes(placeholder)) {
    throw new Error(
      `Prerender failed: placeholder "${placeholder}" not found in index.html. ` +
        'Ensure the root element matches exactly so prerendered HTML can be injected.',
    )
  }

  const { render } = await import(pathToFileURL(path.resolve(serverDir, 'entry-server.js')).href)

  for (const route of routes) {
    const appHtml = render(route.path)

    let html = baseTemplate

    // Replace prerendered app content
    html = html.replace(placeholder, `<div id="root">${appHtml}</div>`)

    if (html === baseTemplate) {
      throw new Error('Prerender failed: root placeholder replacement did not modify index.html.')
    }

    // Update <title>
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)

    // Update meta description
    html = html.replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${route.description}"`,
    )

    // Update canonical
    html = html.replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${route.canonical}"`,
    )

    // Update OG URL
    html = html.replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${route.canonical}"`,
    )

    // Update OG title
    html = html.replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${route.title}"`,
    )

    // Update OG description
    html = html.replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${route.description}"`,
    )

    // Update Twitter URL
    html = html.replace(
      /<meta name="twitter:url" content="[^"]*"/,
      `<meta name="twitter:url" content="${route.canonical}"`,
    )

    // Update Twitter title
    html = html.replace(
      /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${route.title}"`,
    )

    // Update Twitter description
    html = html.replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${route.description}"`,
    )

    // Ensure output directory exists
    fs.mkdirSync(path.dirname(route.outFile), { recursive: true })
    fs.writeFileSync(route.outFile, html)
    console.log(`✓ Pre-rendered ${route.path}`)
  }

  fs.rmSync(serverDir, { recursive: true, force: true })
}

prerender().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
