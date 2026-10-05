// Generates the 1200x630 link-preview image (Open Graph / Twitter Card).
//   npm run og
// Output: public/og-image.jpg  (keep under ~300 KB; WhatsApp ignores images over ~600 KB)
// Edit the TEXT block below to change the copy, then re-run.
import sharp from 'sharp'
import { statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const img = (f) => join(root, 'public/img', f)
const W = 1200
const H = 630

const COLORS = { cream: '#FFF3D6', cream2: '#FBE3B0', amber: '#F5A623', orange: '#EE7F13', maroon: '#6E1F0E', teal: '#1F4A55' }
const TEXT = {
  brand: 'LUMIÈRE ARTESANAL',
  headline: ['Alfajores artesanales', 'hechos a mano'],
  sub: 'Recetas argentinas · Yopal, Casanare',
  pill: 'Arma tu caja de 4 · 9 sabores',
}
const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "'Segoe UI', Arial, Helvetica, sans-serif"

const round = (file, size) =>
  sharp(file)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}"/></svg>`), blend: 'dest-in' }])
    .png()
    .toBuffer()

const ring = (size, stroke, color) =>
  Buffer.from(`<svg width="${size + stroke * 2}" height="${size + stroke * 2}"><circle cx="${size / 2 + stroke}" cy="${size / 2 + stroke}" r="${size / 2 + stroke / 2}" fill="none" stroke="${color}" stroke-width="${stroke}"/></svg>`)

// Background: cream with a soft sun glow behind the logo and a maroon base strip.
const rays = Array.from({ length: 16 }, (_, i) => `<path d="M0 -250 C34 -300 34 -350 0 -400 C-34 -350 -34 -300 0 -250Z" transform="rotate(${(360 / 16) * i})" fill="${i % 2 ? COLORS.amber : COLORS.orange}" opacity=".35"/>`).join('')
const background = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${COLORS.cream}"/><stop offset="1" stop-color="${COLORS.cream2}"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <g transform="translate(985 315)">${rays}</g>
  <rect y="${H - 14}" width="${W}" height="14" fill="${COLORS.maroon}"/>
</svg>`)

const text = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <text x="70" y="120" font-family="${SANS}" font-size="26" font-weight="700" letter-spacing="6" fill="${COLORS.teal}">${TEXT.brand}</text>
  <text x="70" y="230" font-family="${SERIF}" font-size="64" font-weight="700" fill="${COLORS.maroon}">${TEXT.headline[0]}</text>
  <text x="70" y="305" font-family="${SERIF}" font-size="64" font-weight="700" fill="${COLORS.maroon}">${TEXT.headline[1]}</text>
  <text x="70" y="385" font-family="${SANS}" font-size="32" fill="${COLORS.maroon}">${TEXT.sub}</text>
  <rect x="70" y="425" rx="32" ry="32" width="470" height="64" fill="${COLORS.orange}" stroke="${COLORS.maroon}" stroke-width="3"/>
  <text x="305" y="466" text-anchor="middle" font-family="${SANS}" font-size="28" font-weight="700" fill="#fff">${TEXT.pill}</text>
</svg>`)

const LOGO = 330
const THUMB = 96
const thumbs = ['alfajor-arequipe-tradicional.webp', 'alfajor-arequipe-oreo.webp', 'alfajor-red-velvet.webp']

const layers = [
  { input: await round(img('lumiere-artesanal-logo.webp'), LOGO), left: 820, top: 150 },
  { input: ring(LOGO, 6, COLORS.maroon), left: 820 - 6, top: 150 - 6 },
  { input: text, left: 0, top: 0 },
]
for (const [i, file] of thumbs.entries()) {
  const left = 70 + i * (THUMB + 18)
  layers.push({ input: await round(img(file), THUMB), left, top: 505 })
  layers.push({ input: ring(THUMB, 4, COLORS.amber), left: left - 4, top: 505 - 4 })
}

const output = join(root, 'public/og-image.jpg')
await sharp(background).composite(layers).jpeg({ quality: 86, mozjpeg: true }).toFile(output)
console.log(`og-image.jpg ${W}x${H}, ${(statSync(output).size / 1024).toFixed(0)} KB`)
