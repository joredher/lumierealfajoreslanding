import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const html = readFileSync(join(root, 'index.html'), 'utf8')
const meta = (attr, name) => html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`))?.[1]

describe('index.html SEO', () => {
  it('is Colombian Spanish', () => {
    expect(html).toMatch(/<html lang="es-CO">/)
    expect(meta('property', 'og:locale')).toBe('es_CO')
  })

  it('has a title ≤ 60 chars and a description ≤ 155 chars', () => {
    const title = html.match(/<title>(.*)<\/title>/)[1]
    expect(title.length).toBeLessThanOrEqual(60)
    expect(title.toLowerCase()).toContain('alfajores')
    const desc = meta('name', 'description')
    expect(desc.length).toBeGreaterThan(70)
    expect(desc.length).toBeLessThanOrEqual(155)
  })

  it('has canonical + Open Graph + Twitter tags using the __SITE_URL__ token (absolute at build)', () => {
    expect(html).toContain('<link rel="canonical" href="__SITE_URL__/" />')
    for (const [attr, name] of [['property', 'og:image'], ['property', 'og:url'], ['name', 'twitter:image']]) {
      expect(meta(attr, name)).toMatch(/^__SITE_URL__\//)
    }
    expect(meta('property', 'og:image:width')).toBe('1200')
    expect(meta('property', 'og:image:height')).toBe('630')
    expect(meta('name', 'twitter:card')).toBe('summary_large_image')
  })

  it('has valid JSON-LD with Bakery and four priced Products and no fake ratings', () => {
    const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]
    const graph = JSON.parse(json)['@graph']
    expect(graph.map((n) => n['@type'])).toEqual(['Bakery', 'WebSite', 'Product', 'Product', 'Product', 'Product'])
    const prices = graph.filter((n) => n['@type'] === 'Product').map((n) => n.offers.price)
    expect(prices).toEqual(['15000', '25000', '4000', '7000'])
    expect(json).not.toMatch(/aggregateRating|"review"/)
  })

  it('has the favicon files, OG image and manifest on disk', () => {
    for (const f of ['favicon.ico', 'favicon-32.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'og-image.jpg', 'site.webmanifest']) {
      expect(existsSync(join(root, 'public', f))).toBe(true)
    }
  })
})
