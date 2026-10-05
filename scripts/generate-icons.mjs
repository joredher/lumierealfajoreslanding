// Generates the favicon set from the brand logo.
//   npm run icons
// Output (public/): favicon.ico, favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const logo = join(root, 'public/img/lumiere-artesanal-logo.webp')
const out = (f) => join(root, 'public', f)

// The logo cropped to a clean circle on a transparent background.
const circle = (size) =>
  sharp(logo)
    .resize(size, size)
    .composite([{ input: Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`), blend: 'dest-in' }])
    .png()

await circle(32).toFile(out('favicon-32.png'))
await circle(192).toFile(out('icon-192.png'))
await circle(512).toFile(out('icon-512.png'))

// Apple touch icons must be opaque: put the circle on the brand cream.
const inner = await circle(Math.round(180 * 0.86)).toBuffer()
await sharp({ create: { width: 180, height: 180, channels: 3, background: '#FFF3D6' } })
  .composite([{ input: inner, gravity: 'center' }])
  .png()
  .toFile(out('apple-touch-icon.png'))

// favicon.ico = ICO container holding a 48px PNG (supported by all current browsers)
const ico48 = await circle(48).toBuffer()
const header = Buffer.alloc(22)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(1, 4) // image count
header.writeUInt8(48, 6) // width
header.writeUInt8(48, 7) // height
header.writeUInt16LE(1, 10) // color planes
header.writeUInt16LE(32, 12) // bits per pixel
header.writeUInt32LE(ico48.length, 14) // image size
header.writeUInt32LE(22, 18) // image offset
writeFileSync(out('favicon.ico'), Buffer.concat([header, ico48]))

console.log('Icons written to public/')
