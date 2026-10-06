# Nulset website

Pixel-faithful rebuild of the [Nulset landing page](https://left-pebble-92007349.figma.site/).

## Live

https://0xdanki.github.io/nulset-website/

## Stack

- Vite + React + TypeScript
- Plain CSS ported from the published design
- Self-hosted Nimbus Sans (Helvetica-compatible webfont)

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Notes

- Request-access form is preview-only (no backend yet).
- Assets live in `public/assets/`.
- GitHub Pages builds with `GITHUB_PAGES=true` so the app base path is `/nulset-website/`.
