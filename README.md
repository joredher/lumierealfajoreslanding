# Lumière Artesanal – landing page

React + Vite landing page for Lumière Artesanal (alfajores argentinos), with a cart that sends orders via WhatsApp.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Personalise
- `src/data/site.js`: WhatsApp number, email, Instagram, currency, **products and prices** (all placeholders marked TODO).
- Product photos: drop images in `public/` and set `image: '/foto.webp'` on a product.
- `index.html`: SEO title/description, Open Graph, JSON-LD. Replace `www.lumiereartesanal.com` with the real domain here, in `public/robots.txt` and `public/sitemap.xml`.

## Selling online
Checkout builds the order and opens WhatsApp with it prefilled (no fees, no backend). To add card payments later, replace the submit handler in `src/components/CartDrawer.jsx` with a Mercado Pago / Stripe checkout link.
