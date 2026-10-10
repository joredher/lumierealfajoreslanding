import { describe, expect, it } from 'vitest'
import { existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { BOX_SIZE, DEFAULT_SIZE, FLAVORS, IMAGES, ROLLS, SIZES, SITE, formatPrice, sizeOf } from './site.js'

const publicFile = (p) => join(process.cwd(), 'public', p)

describe('pricing', () => {
  it('has the agreed box prices', () => {
    expect(BOX_SIZE).toBe(4)
    expect(sizeOf('mini').price).toBe(15000)
    expect(sizeOf('grande').price).toBe(25000)
  })

  it('falls back to the default size for unknown or legacy values', () => {
    expect(sizeOf(undefined).id).toBe(DEFAULT_SIZE)
    expect(sizeOf('xl').id).toBe(DEFAULT_SIZE)
    expect(SIZES.map((s) => s.id)).toContain(DEFAULT_SIZE)
  })

  it('formats prices as Colombian pesos without decimals', () => {
    const text = formatPrice(25000).replace(/\s/g, ' ')
    expect(text).toMatch(/25\.000/)
    expect(text).not.toMatch(/,\d\d/)
  })
})

describe('contact data', () => {
  it('has the real WhatsApp number and Instagram', () => {
    expect(SITE.whatsapp).toBe('573144171683')
    expect(SITE.instagram).toBe('lumiere.artesanall')
    expect(SITE.catalogUrl).toBe('https://wa.me/c/573144171683')
  })
})

describe('flavours and images (SEO)', () => {
  it('has 9 unique flavours', () => {
    expect(FLAVORS).toHaveLength(9)
    expect(new Set(FLAVORS.map((f) => f.id)).size).toBe(9)
  })

  it.each([...FLAVORS.map((f) => [f.id, f]), ['rolls', ROLLS]])('%s: file exists, <500 KB, keyword name, alt, dimensions', (_id, item) => {
    expect(item.image).toMatch(/^\/img\/[a-z0-9-]+\.webp$/)
    expect(existsSync(publicFile(item.image))).toBe(true)
    expect(statSync(publicFile(item.image)).size).toBeLessThan(500 * 1024)
    expect(item.alt.length).toBeGreaterThan(20)
    expect(item.width).toBeGreaterThan(0)
    expect(item.height).toBeGreaterThan(0)
  })

  it('brand images exist and have alt text', () => {
    for (const img of Object.values(IMAGES)) {
      expect(existsSync(publicFile(img.src))).toBe(true)
      expect(img.alt.length).toBeGreaterThan(10)
    }
  })
})

describe('order pricing helpers', () => {
  it('has the loose-alfajor rules: min 2, 4.000 mini / 7.000 big, 7.000 delivery', async () => {
    const { MIN_LOOSE, MAX_LOOSE, DELIVERY_FEE } = await import('./site.js')
    expect(MIN_LOOSE).toBe(2)
    expect(MAX_LOOSE).toBeGreaterThanOrEqual(8)
    expect(DELIVERY_FEE).toBe(7000)
    expect(sizeOf('mini').unitPrice).toBe(4000)
    expect(sizeOf('grande').unitPrice).toBe(7000)
  })

  it('prices boxes by size and loose orders by unit', async () => {
    const { itemPrice, itemUnits } = await import('./site.js')
    expect(itemPrice({ kind: 'box', size: 'mini', flavors: { milo: 4 } })).toBe(15000)
    expect(itemPrice({ kind: 'box', size: 'grande', flavors: { milo: 4 } })).toBe(25000)
    expect(itemPrice({ kind: 'loose', size: 'mini', flavors: { milo: 2, nuez: 1 } })).toBe(12000)
    expect(itemPrice({ kind: 'loose', size: 'grande', flavors: { milo: 2 } })).toBe(14000)
    expect(itemUnits({ kind: 'loose', size: 'grande', flavors: { milo: 2, nuez: 3 } })).toBe(5)
    expect(itemUnits({ kind: 'box', size: 'grande', flavors: { milo: 4 } })).toBe(4)
  })

  it('treats older saved carts (no kind) as boxes', async () => {
    const { itemPrice } = await import('./site.js')
    expect(itemPrice({ size: 'mini', flavors: { milo: 4 } })).toBe(15000)
  })
})
