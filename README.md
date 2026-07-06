# Alba Development

Marketing site for Alba Development, positioned around business outcomes rather than technical capability alone.

## Positioning

The site should lead with the outcomes buyers want:

- Increase bookings, enquiries, or revenue.
- Reduce manual admin and operational friction.
- Improve reporting and decision-making.
- Validate and launch new digital products faster.

Technical capability is supporting proof, not the headline promise.

## Primary audience

- Business owners who want growth, efficiency, or better visibility.
- Startup founders who need to validate or launch a product.
- Buyers who may not know the exact software they need, but do know the commercial problem they want to solve.

## Page roles

- Home: communicate the business value proposition quickly, establish trust, and drive qualified enquiries.
- Services: explain the main outcome categories and help buyers understand the right next step.
- Portfolio: act as proof, showing problems solved and likely business impact rather than only screenshots or features.
- Contact: capture business goal, current bottleneck, and useful context for qualification.

## Content model

When editing key sections, keep this order in mind:

1. Outcome
2. Mechanism
3. Proof
4. Call to action

Examples:

- Say "increase bookings" before "custom booking platform".
- Say "cut manual admin" before "internal tool".
- Say "better operational visibility" before "analytics dashboard".

## Proof rules

- Prefer business impact framing over technical feature lists.
- Use directional outcomes when precise metrics are unavailable.
- Do not publish testimonials until real client quotes are available.

## Metadata and prerendering

- Default metadata lives in [index.html](./index.html).
- Route-level metadata is updated during prerendering in [scripts/prerender.js](./scripts/prerender.js).
- Visible FAQ content and FAQ structured data must stay aligned.
- If positioning changes, update on-page copy, metadata, and the social share image text together.
- Canonical URLs and sitemap entries use trailing slashes (`/services/`, `/portfolio/`, `/contact/`) to match how nginx serves the prerendered `route/index.html` files without a redirect hop.
- The social share image is `public/og-image.png` (1200x630 raster; social crawlers do not reliably render SVG). `public/og-image.svg` is the editable source — after changing it, re-rasterize with sharp (available in `../host-website/node_modules`):

```bash
node -e "import('sharp').then(async ({default: s}) => s('public/og-image.svg', {density: 96}).resize(1200, 630).png().toFile('public/og-image.png'))"
```

## Static assets

- Portfolio screenshots live in `public/images/portfolio/` and are referenced from `src/components/Portfolio.jsx`. They are committed to the repo — a fresh clone builds a complete site.

## Portfolio content

- Projects are defined in the `projects` array in `src/components/Portfolio.jsx`. The home page shows the first four; `/portfolio` shows all.
- Live products lead the list (Alba Stays, DataMill, Digital Guest Concierge, AirCleaning). Cards with a `link` field render a "View live site" CTA.
- LaundRoute has `image: null` until a screenshot is captured from a local run — the card shows a styled placeholder in the meantime.

## Contact details

- Phone (+44 7759 195959) appears in the footer (`src/components/Footer.jsx`) and in the `ProfessionalService` JSON-LD in `index.html`. Contact is via the form on `/contact` only — no public email address is published.

## Navigation

- Desktop (`sm` and up): inline Services / Portfolio links plus the Get in Touch CTA.
- Mobile: hamburger toggle in `src/components/Navbar.jsx` (`aria-expanded`/`aria-controls` wired) revealing Services / Portfolio / Contact; links close the menu on tap.

## Analytics

First-party analytics via the hosted Alba tracker — see [../ANALYTICS.md](../ANALYTICS.md).

- Script tag and `pageLabels` config live in [index.html](./index.html).
- Property slug: `alba-development`.
- Optional `data-analytics-label` on portfolio cards and hero CTAs in components.

## Deployment notes

- nginx server blocks are injected by [deploy.ps1](./deploy.ps1) and mirrored in `../edi-frontend-platform/infrastructure/nginx.conf`.
- The www server block sets `absolute_redirect off;` so trailing-slash redirects (e.g. `/portfolio` -> `/portfolio/`) emit relative Location headers. Without it, nginx behind the Cloudflare Tunnel leaks `http://www.albadevelopment.co.uk:8083/...` and direct navigation breaks. Re-run the deploy script (Phase 4 + nginx reload) to apply config changes on the Pi.

## Commands

```bash
npm run dev
npm run build
npm run lint
```