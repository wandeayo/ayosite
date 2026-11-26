# Self-hosted fonts

The latin subsets of the site's typefaces, exactly as Google Fonts serves them. They are
loaded with `next/font/local` so builds never fetch from Google Fonts (a malformed Google
response failed the production build on 2026-11-05). Visitors get the same files as before.

| File | Family | Used by | License |
|---|---|---|---|
| `geist-normal-latin.woff2` | Geist (variable, 300–600) | home, About, case studies, 404 | SIL OFL 1.1 ([Vercel](https://github.com/vercel/geist-font)) |
| `geist-mono-normal-latin.woff2` | Geist Mono (variable, 400–500) | home, About, case studies, 404 | SIL OFL 1.1 ([Vercel](https://github.com/vercel/geist-font)) |
| `inter-normal-latin.woff2` | Inter (variable, 400–600) | Carmen prototypes | SIL OFL 1.1 ([rsms/inter](https://github.com/rsms/inter)) |

| `cormorant-garamond-500-normal-latin.woff2` | Cormorant Garamond 500 | Scents by Biba figures | SIL OFL 1.1 ([CatharsisFonts](https://github.com/CatharsisFonts/Cormorant)) |
| `cormorant-garamond-500-italic-latin.woff2` | Cormorant Garamond 500 italic | Scents by Biba figures | SIL OFL 1.1 |
| `jost-normal-latin.woff2` | Jost (variable, 100–900) | Scents by Biba figures | SIL OFL 1.1 ([indestructible-type](https://github.com/indestructible-type/Jost)) |
| `jost-normal-latin-ext.woff2` | Jost (variable), latin-ext | Scents by Biba figures: only the ₦ in prices | SIL OFL 1.1 |

The Cormorant and Jost files are the Fontsource builds the Scents by Biba shop itself serves
(copied from its build, 2026-11-26), so the case study's figures set type exactly as the shop
does. Jost also needs its latin-ext file because ₦ (U+20A6) isn't in latin; it loads only on a
page that renders ₦. They are declared in `components/side-quests/scents/fonts.ts`, not fetched
by the script below.

To refresh them, or to add a weight or family, update `scripts/fetch-fonts.mjs`, run
`node scripts/fetch-fonts.mjs`, and mirror the printed faces in the `localFont()` calls
(`app/layout.tsx`, `components/case/pages/carmen.tsx`).
