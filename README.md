# Lumière Artesanal – landing page

React + Vite landing page for Lumière Artesanal (alfajores, Yopal, Casanare). Customers build a box of 4 mixed flavours (25.000 COP) and send the order via WhatsApp.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Personalise
- `src/data/site.js`: WhatsApp, Instagram, city, box size/price, and the flavour list (names, descriptions, "nuevo" badge).
- Flavour photos live in `public/img/<id>.webp`; Juliana's photo is `public/img/juliana.webp`.
- Juliana's bio: `src/components/Sections.jsx` (`About`).
- SEO: `index.html`. Replace `www.lumiereartesanal.com` with the real domain there, in `public/robots.txt` and `public/sitemap.xml`.

## Selling online
The floating "Arma tu caja" button opens the box builder; finished boxes go to the cart, and checkout opens WhatsApp with the order prefilled. For card payments later, replace the submit handler in `src/components/CartDrawer.jsx`.
