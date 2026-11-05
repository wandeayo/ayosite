# Self-hosted fonts

The latin subsets of the site's typefaces, exactly as Google Fonts serves them. They are
loaded with `next/font/local` so builds never fetch from Google Fonts (a malformed Google
response failed the production build on 2026-11-05). Visitors get the same files as before.

| File | Family | Used by | License |
|---|---|---|---|
| `geist-normal-latin.woff2` | Geist (variable, 300–600) | home, About, case studies, 404 | SIL OFL 1.1 ([Vercel](https://github.com/vercel/geist-font)) |
| `geist-mono-normal-latin.woff2` | Geist Mono (variable, 400–500) | home, About, case studies, 404 | SIL OFL 1.1 ([Vercel](https://github.com/vercel/geist-font)) |
| `inter-normal-latin.woff2` | Inter (variable, 400–600) | Carmen prototypes | SIL OFL 1.1 ([rsms/inter](https://github.com/rsms/inter)) |

To refresh them, or to add a weight or family, update `scripts/fetch-fonts.mjs`, run
`node scripts/fetch-fonts.mjs`, and mirror the printed faces in the `localFont()` calls
(`app/layout.tsx`, `components/case/pages/carmen.tsx`).
