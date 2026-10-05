# Link previews (WhatsApp, Facebook, LinkedIn)

The preview card comes from the Open Graph tags in `index.html` and the image `public/og-image.jpg` (1200×630, ~90 KB).
All URLs in those tags are **absolute** and built from `VITE_SITE_URL`.

## Regenerate the image
```bash
npm run og      # rewrites public/og-image.jpg
```
Edit the `TEXT` block at the top of `scripts/generate-og.mjs` to change the copy. Keep the file under ~300 KB.
After changing it, **rename or version the URL** (see "Cache" below) or old previews will keep showing.

## Before testing
Scrapers can only reach a **public https URL**. `localhost` will not work. Deploy first, or use a temporary tunnel
(for example `cloudflared tunnel --url http://localhost:5173`) to test before launch. Make sure `VITE_SITE_URL`
matches the URL you are testing, otherwise the tags point to the wrong domain.

## WhatsApp
1. Send the site URL to yourself or to a test chat on WhatsApp (phone or WhatsApp Web).
2. A card with the image, title and description should appear under the link.
3. WhatsApp has no debugger. It reads the same Open Graph tags as Facebook, so if Facebook's debugger looks right, WhatsApp will too.
4. WhatsApp caches previews aggressively (days). If you changed the image or text and still see the old card, serve the image from a new URL (e.g. `og-image-v2.jpg`, and update `index.html`), then share the link again.
5. If no image appears: the image is probably too heavy (keep < 300 KB), the URL is relative/not https, or the server blocks the crawler.

## Facebook
1. Open the [Sharing Debugger](https://developers.facebook.com/tools/debug/) (needs a Facebook login).
2. Paste the URL and click **Debug**; check image, title, description and that there are no warnings.
3. Click **Scrape Again** after every change to refresh Facebook's cache.

## LinkedIn
1. Open the [Post Inspector](https://www.linkedin.com/post-inspector/) (needs a LinkedIn login).
2. Paste the URL and click **Inspect**. This also refreshes LinkedIn's cache.

## Quick checklist
- [ ] `og:image` loads in a browser at its absolute URL
- [ ] Image is 1200×630 and < 300 KB
- [ ] Title ≤ 60 characters, description ≤ 155
- [ ] Domain in the tags is the real one (no `example` or placeholder)
