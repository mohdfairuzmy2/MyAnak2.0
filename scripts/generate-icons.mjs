import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '../public')
const anySvg = resolve(__dirname, 'icon-any.svg')
const maskableSvg = resolve(__dirname, 'icon-maskable.svg')

const targets = [
  { src: anySvg, size: 192, out: 'pwa-192x192.png' },
  { src: anySvg, size: 512, out: 'pwa-512x512.png' },
  { src: maskableSvg, size: 512, out: 'maskable-icon-512x512.png' },
  { src: anySvg, size: 180, out: 'apple-touch-icon.png' },
]

for (const { src, size, out } of targets) {
  await sharp(src, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(resolve(publicDir, out))
  console.log(`generated ${out} (${size}x${size})`)
}
