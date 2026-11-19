# THE MERIDIAN INN — Boutique Hotel Website Demo

A complete single-page, client-showcase demo for an invented urban boutique hotel concept. It is standalone: no shared packages, no sibling-folder imports, no backend and no analytics.

> **Demo concept — sample information.** All rates, availability, policies, contact details, opening hours, addresses, distances, profiles and photography captions are illustrative. Nothing is booked, paid for or transmitted.

## Brand and art direction

**Brand story:** THE MERIDIAN INN is a design-led city hotel concept for travellers who want a compact, calm base with useful spaces rather than resort spectacle. The copy is specific but deliberately framed as a sample concept for a real client to replace.

**Visual direction:** urban architectural, compact cards, clean data-forward room comparison. The hero is an asymmetric split layout with a stepped sand block, a tall photograph and a slate information card — intentionally different from a full-bleed resort hero.

### Design tokens

| Token group | Values |
| --- | --- |
| Colour | Slate `#243b52`, deep ink `#17293b`, sand `#d8c5a7`, sand light `#eee5d7`, warm white `#f8f5ee`, paper `#fffdf8` |
| Typography | Display: **DM Serif Display**; body/UI: **Plus Jakarta Sans**; serif used only for accents, numerals and a few headings |
| Spacing | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px scale |
| Radius | 3 px controls, 6 px cards, pill chips |
| Depth | Fine 1 px rules, soft `0 12px 32px` shadow, lift `0 20px 48px` shadow |
| Motion | 160–240 ms transform/opacity transitions with `cubic-bezier(.2,.7,.3,1)`; all motion disabled under `prefers-reduced-motion: reduce` |
| Iconography | Lucide, 16–26 px, consistent stroke weight, never emoji |

## Sections

1. **Home / hero** — asymmetric editorial hero, sample-date finder, primary room and enquiry CTAs.
2. **Rooms** — tabbed room cards / accessible comparison table, plus a sample stay estimate calculator with visible formula inputs.
3. **Amenities** — category chips, text search, live result count and a real empty state.
4. **Business stays** — sample capacity/staffing figures, work features, FAQ accordion and business enquiry CTA.
5. **Dining** — keyboard-accessible menu tabs with demo schedules and sample prices.
6. **Nearby** — four generic sample neighbourhood entries with illustrative walking times.
7. **Gallery** — ten-image local gallery with a keyboard-operable lightbox.
8. **Location** — CSS map placeholder, labelled sample address, copy action and access enquiry CTA.
9. **Contact** — validated direct enquiry form with a clear demo-only success panel.

## Interactions

- Sticky responsive header with mobile menu: `aria-expanded`, `aria-controls`, outside-click/Escape close, focus return, anchor close.
- Room tabs and dining tabs implement `tablist` / `tab` / `tabpanel`, arrow-key navigation and visible selection.
- Room comparison table uses row/column headers and a labelled sample-rate row.
- Sample estimate recalculates from room rate, nights, nightly levy and extra-adult fee; all formula components are shown.
- Amenity filters combine category state with a search query and announce the result count.
- Gallery lightbox supports arrows, Escape, backdrop click, labelled close/previous/next controls, focus trap, focus restore, alt text and caption.
- Enquiry form uses controlled inputs, visible labels, `autoComplete`, blur/submit validation, `aria-invalid`, `aria-describedby`, first-invalid-field focus and a success panel containing the required demo disclaimer.
- "Copy sample address" uses the Clipboard API with a visible status fallback.
- Every CTA scrolls to a section, opens a dialog action, changes state or pre-fills the enquiry form. No `href="#"`, dead buttons or `alert()`-only feedback.

## Stack and files

- React 19, TypeScript 5.9, Vite 7, `lucide-react`, hand-written CSS. No Tailwind, animation library, backend or remote image URLs.
- `src/data.ts` — all sample content and shared types.
- `src/components/` — one focused component per section/interaction.
- `src/styles.css` — token system, layout, states and responsive rules.
- `src/utils.ts` — date, scroll and currency helpers.
- `public/images/` — the ten supplied local JPGs; all are used.

## Commands

```bash
npm install
npm run dev       # local development server
npm run typecheck # tsc --noEmit (also used as lint)
npm run build     # typecheck + production build -> dist/
npm run preview   # serve the production build locally
```

### Build-tool note

`package.json` aliases the build-only `rollup` package to `@rollup/wasm-node@4.68.7`. This was necessary in the build environment because the operating system's Application Control policy blocked the native Rollup `.node` binary. It does not change any site runtime code; the WASM bundler is slower but portable. If a client environment permits native Rollup, the alias may be removed and the dependency restored to the Vite default.

## Deployment

Static host: run `npm install` and `npm run build`, then publish the generated `dist/` directory to any static host (Netlify, Vercel, GitHub Pages, S3/CloudFront, nginx). No server-side routing is required because the site is one page with hash anchors. Set the public base path in `vite.config.ts` only if the host serves the site from a subpath. Google Fonts are linked in `index.html`; the local font stack is the fallback when offline.

## Sample-data disclosure

The UI labels sample rates, sample policies, demo schedules, illustrative distances, sample addresses, sample photography and the demo enquiry outcome. No real testimonials, ratings, awards, credentials, availability or business facts are claimed. The footer carries a permanent "Demo concept — sample information" notice. No form data is stored or sent anywhere.

## Placeholders a real client must replace

- **Address:** `Sample address: 14 Meridian Lane, Old Quarter, [City]` in `src/data.ts`, plus the map label in `src/components/Location.tsx` and footer copy.
- **Phone / WhatsApp:** the link `https://wa.me/000000000000` is a documented demo placeholder. Its accessible label is "Demo WhatsApp link — replace with client number". Replace both the href and label.
- **Email:** `hello@meridian-inn.example` (reserved example domain) in `src/data.ts`.
- **Rates and fees:** nightly rates in `src/data.ts`, levy/extra-guest values in `src/components/Rooms.tsx`, and sample dining prices.
- **Policies and availability:** cancellation, quiet hours, capacity, included amenities, check-in times, extra-guest terms and all "sample" statements.
- **Schedules:** dining hours and staffed business hours.
- **Business facts and names:** room names, neighbourhood entries, statistics and brand story copy.
- **Photography captions:** all ten images are generic supplied photos; replace with commissioned property photography and accurate alt text.
- **Map:** replace the CSS placeholder with an approved map embed and verified access information.
- **Form flow:** connect the enquiry to the client's confirmed booking/CRM process and replace the demo success panel before launch.
- **SEO/OG:** refine title, description and OG image in `index.html` with final client details.
