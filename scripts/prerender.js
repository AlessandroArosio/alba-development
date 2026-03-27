import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build, loadConfigFromFile } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.resolve(rootDir, 'dist')
const serverDir = path.resolve(distDir, 'server')

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

  const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8')

  const placeholder = '<div id="root"></div>'
  if (!template.includes(placeholder)) {
    throw new Error(
      `Prerender failed: placeholder "${placeholder}" not found in index.html. ` +
        'Ensure the root element matches exactly so prerendered HTML can be injected.',
    )
  }

  const { render } = await import(pathToFileURL(path.resolve(serverDir, 'entry-server.js')).href)
  const appHtml = render()

  const html = template.replace(
    placeholder,
    `<div id="root">${appHtml}</div>`,
  )

  if (html === template) {
    throw new Error('Prerender failed: root placeholder replacement did not modify index.html.')
  }

  fs.writeFileSync(path.resolve(distDir, 'index.html'), html)
  console.log('✓ Pre-rendered index.html')

  fs.rmSync(serverDir, { recursive: true, force: true })
}

prerender().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
