# Launch checklist – Lumière Artesanal

Work through it top to bottom. Items marked ❓ need a decision or detail from you.

## 1. Before launch

**Details to confirm (❓)**
- [ ] ❓ Final domain (e.g. `www.…`). Decide `www` vs no-`www` and redirect the other to it.
- [ ] ❓ Brand name: the logo says "Lumière Artesanal"; you also wrote "Lumière Alfajores". Pick one and use it everywhere (titles, JSON-LD, social).
- [ ] ❓ Delivery area (only Yopal? all of Casanare? national shipping?). The copy must say what is true.
- [ ] ❓ Street address or "pickup point" if the public may visit (needed for a Google Business Profile with a physical location; otherwise set it as a service-area business).
- [ ] ❓ Business email, and social handles beyond Instagram (`lumiere.artesanall`): Facebook, TikTok?

**Configuration**
- [ ] Create `.env.local` from `.env.example`: `VITE_SITE_URL=https://…` (no trailing slash) and `VITE_GA_ID=G-…`. **Never commit `.env.local`** (it is git-ignored).
- [ ] `npm run build` prints no "VITE_SITE_URL is not set" warning.
- [ ] Search `dist/` for the placeholder `lumiereartesanal.com`: nothing should remain unless it's your real domain.
- [ ] Open `dist/sitemap.xml` and `dist/robots.txt` and check the domain.
- [ ] Hosting serves the site over **HTTPS**, and `http://` and the other `www` variant 301-redirect to the canonical URL.
- [ ] The staging/preview site is **not** indexable (password or `noindex`), so it never competes with the real one.

**Content and quality**
- [ ] Real prices, real phone, real photos. No invented reviews, awards or numbers.
- [ ] Replace the placeholder bio for Juliana (`src/components/Sections.jsx`).
- [ ] Photos for Milo, Nuez and Nucita (see `public/img/`); keep each under 500 KB.
- [ ] Add a privacy notice and, if you enable analytics, a cookie notice. Colombian data-protection rules (Ley 1581 de 2012) apply to customer data. Confirm what you need with a professional.
- [ ] Place a test order end to end on a phone: choose flavours → cart → WhatsApp opens with the right message.
- [ ] Lighthouse (Chrome DevTools) on mobile: aim for 90+ in SEO, Accessibility and Best Practices; check performance.
- [ ] Test the link preview on WhatsApp, Facebook and LinkedIn: see [link-previews.md](link-previews.md).
- [ ] Favicon shows in the browser tab (`npm run icons` regenerates the set).

**Local presence**
- [ ] Create/claim a **Google Business Profile** (name, category "Panadería"/"Tienda de postres", phone, hours, service area, photos). For a local bakery this often matters as much as the website.
- [ ] Put the website URL in the Instagram bio and in the WhatsApp Business profile.

## 2. At launch (day 0)

**Google Search Console (free)**
1. Go to Search Console → **Add property** → **Domain** (covers `http/https` and `www`).
2. Google shows a **TXT record** to verify ownership. Copy it.
3. Add it in your **DNS zone** (at your domain registrar or Hostinger → Domains → DNS): type `TXT`, host `@`, value = the code Google gave you. Save.
4. Wait a few minutes (sometimes hours) and press **Verify**.
5. If DNS is a hassle, use **URL prefix** → verify with the HTML tag or the file method instead.
6. **Sitemaps** → enter `sitemap.xml` → **Submit**. The status should become "Success".
7. **URL Inspection** → paste the home URL → **Request indexing**.

**Analytics**
- [ ] In Google Analytics, create a GA4 property and a web data stream; copy the Measurement ID (`G-…`) into `VITE_GA_ID`, rebuild and redeploy.
- [ ] Check **Realtime** in GA4 while you open the site on your phone.
- [ ] The cart fires a `generate_lead` event when an order is sent to WhatsApp. In GA4 mark it as a **key event** to count orders.
- [ ] Link GA4 and Search Console (GA4 → Admin → Product links).

**Optional**: add the site to **Bing Webmaster Tools** (you can import it from Search Console).

## 3. After 1–2 weeks

- [ ] Search Console → **Pages**: is the home page "Indexed"? If it says "Discovered/Crawled – currently not indexed", improve content, add internal links and request indexing again; don't resubmit daily.
- [ ] **Sitemaps**: status "Success" and the discovered URL count matches your pages.
- [ ] Search `site:your-domain.com` in Google to see what is indexed.
- [ ] **URL Inspection** on the home page: confirm the canonical Google chose is yours and the page "is on Google".
- [ ] Check **Performance** for the first impressions and queries.
- [ ] Fix anything in "Page indexing" errors (404s, redirect problems, blocked by robots).

## 4. Content: 3–5 posts at launch, then one a month

Search engines (and customers) need more than one page. Suggested launch posts are in [keyword-map.md](keyword-map.md):
1. Qué es un alfajor argentino
2. Arequipe o dulce de leche: la diferencia
3. Cómo conservar alfajores artesanales
4. Ideas para regalar alfajores
5. Tipos de alfajores

Guidelines:
- Write from Juliana's real experience, in natural Spanish; 600+ words, original photos, a short FAQ.
- Each post links to the relevant product page with a descriptive anchor.
- After launch, publish **one post a month**: seasonal topics (Día de la Madre, Amor y Amistad, Navidad, cumpleaños), new flavours, behind-the-scenes.
- This needs real pages: see "Adding pages" in the keyword map.

## 5. Backlinks (links from other sites)

Quality and relevance beat volume. Never buy links.
- **Google Business Profile**, **Instagram**, **WhatsApp Business** and any Facebook page: all pointing to the site.
- **Local directories** and the local chamber of commerce, if you qualify.
- **Local press and radio** in Yopal/Casanare: a short story ("Juliana, alfajores con recetas argentinas en Yopal") with photos.
- **Food and lifestyle bloggers / Instagram creators** in the region: send samples, ask for a link to the site (not only a tag).
- **Fairs and events** where she already sells: ask organisers to link the vendor list to the site.
- **Partners**: cafés, florists, event planners and gift shops that can list or recommend the boxes.
- **Customers**: ask people who post about their box to tag and link the site.

## 6. Monitoring (monthly, ~30 minutes)

- [ ] Search Console → **Performance**: top queries, clicks, CTR, average position. Which queries bring impressions but few clicks? Improve those titles/descriptions.
- [ ] **Pages**: indexed count rising, no new errors.
- [ ] **Core Web Vitals** and **Mobile usability** reports.
- [ ] GA4: sessions by source, WhatsApp orders (`generate_lead`), top pages.
- [ ] Google Business Profile: views, calls, direction requests; reply to reviews (real ones only).
- [ ] Re-run Lighthouse after every big change; check the link preview after any change to `og-image.jpg` or the meta tags.
- [ ] Add the next post and one or two new backlinks.

## 7. Realistic timelines

These are typical ranges, **not guarantees**; they depend on competition, content and links.
| What | Typical timing |
|---|---|
| Home page indexed | A few days to a few weeks |
| First impressions in Search Console | About 2–6 weeks |
| First rankings for local/long-tail terms | About 3–6 months of steady work |
| Competitive national terms | Often longer; needs content and links |

Direct channels (Instagram, WhatsApp, Business Profile, fairs) will bring customers well before search does. Treat SEO as a slow, compounding channel.
