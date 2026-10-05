# Lumière Artesanal – landing page

React + Vite landing page for Lumière Artesanal (alfajores artesanales, Yopal, Casanare). Customers order a box of 4 (mini 15.000 COP / grande 25.000 COP) or loose alfajores (minimum 2; mini 4.000 / grande 7.000 each), optionally with delivery (+7.000 COP), and send the order via WhatsApp.

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # unit + integration tests (vitest)
npm run build    # outputs dist/ (also generates robots.txt + sitemap.xml)
npm run og       # regenerates public/og-image.jpg (link preview, 1200x630)
npm run icons    # regenerates favicons from the logo
```

## Configuration
Copy `.env.example` to `.env.local` (git-ignored, never commit it):

| Variable | Purpose |
|---|---|
| `VITE_SITE_URL` | Public URL without trailing slash. Used for canonical, Open Graph, JSON-LD, sitemap and robots. |
| `VITE_GA_ID` | GA4 measurement ID (`G-XXXXXXXXXX`). Leave empty to ship no analytics. |

## Personalise
- `src/data/site.js`: WhatsApp, Instagram, city, box and per-unit prices, minimum loose units, delivery fee, flavours (names, descriptions, photos, alt text).
- Photos live in `public/img/` (keyword file names, each under 500 KB).
- Juliana's bio: `src/components/Sections.jsx` (`About`).

## Selling online
The floating "Haz tu pedido" button opens the order builder (box of 4, or loose alfajores with a minimum of 2); finished items go to the cart, and checkout opens WhatsApp with the order prefilled. For card payments later, replace the submit handler in `src/components/CartDrawer.jsx`.

### Order timeout (invisible to the customer)
If someone selects products and does not send the order within **15 minutes** of their last change, the selection is
cleared and a modal asks them to choose again. It also applies when they close the site and return later.
Change `EXPIRY_MS` in `src/orderStore.js`. Logic: `src/useOrderExpiry.js`.

## SEO
Docs in `docs/seo/`: [keyword map](docs/seo/keyword-map.md), [launch checklist](docs/seo/launch-checklist.md), [link previews](docs/seo/link-previews.md).
