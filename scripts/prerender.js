import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.resolve(rootDir, 'dist')
const serverDir = path.resolve(distDir, 'server')

async function prerender() {
  console.log('Building SSR bundle...')

  await build({
    logLevel: 'warn',
    plugins: [react()],
    build: {
      ssr: true,
      rollupOptions: {
        input: path.resolve(rootDir, 'src/entry-server.jsx'),
      },
      outDir: serverDir,
    },
  })

  const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8')

  const { render } = await import(path.resolve(serverDir, 'entry-server.js'))
  const appHtml = render()

  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  )

  fs.writeFileSync(path.resolve(distDir, 'index.html'), html)
  console.log('✓ Pre-rendered index.html')

  fs.rmSync(serverDir, { recursive: true, force: true })
}

prerender().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
