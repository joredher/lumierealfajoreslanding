import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const FALLBACK_URL = 'https://www.lumiereartesanal.com' // placeholder until the real domain is set

// SEO build step:
//  - replaces __SITE_URL__ in index.html (canonical, Open Graph, JSON-LD) with VITE_SITE_URL
//  - injects the GA4 snippet only when VITE_GA_ID is set (e.g. G-XXXXXXXXXX)
//  - emits robots.txt and sitemap.xml with the same absolute URL
function seo({ siteUrl, gaId, isBuild }) {
  const ga = /^G-[A-Z0-9]+$/.test(gaId || '')
    ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    </script>`
    : ''

  return {
    name: 'lumiere-seo',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl).replace('<!--GA4-->', ga),
    buildStart() {
      if (!isBuild) return
      if (siteUrl === FALLBACK_URL) this.warn('VITE_SITE_URL is not set: canonical, sitemap and og:image use the placeholder domain.')
      if (!ga) this.warn('VITE_GA_ID is not set: Google Analytics is not included in this build.')
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image><image:loc>${siteUrl}/og-image.jpg</image:loc><image:title>Lumière Artesanal: alfajores artesanales hechos a mano en Yopal</image:title></image:image>
    <image:image><image:loc>${siteUrl}/img/alfajor-arequipe-tradicional.webp</image:loc><image:title>Alfajor artesanal de arequipe tradicional</image:title></image:image>
    <image:image><image:loc>${siteUrl}/img/rolls-de-canela-yopal.webp</image:loc><image:title>Rolls de canela en Yopal</image:title></image:image>
  </url>
</urlset>
`,
      })
    },
  }
}

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = (env.VITE_SITE_URL || FALLBACK_URL).replace(/\/$/, '')
  return {
    plugins: [react(), seo({ siteUrl, gaId: env.VITE_GA_ID, isBuild: command === 'build' })],
    // 'threads' pool: the default forks pool times out on Windows paths containing spaces
    test: { pool: 'threads', testTimeout: 20000, environment: 'jsdom', setupFiles: ['./src/test/setup.js'], globals: true, css: false },
  }
})
