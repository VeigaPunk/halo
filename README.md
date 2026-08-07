# Halo — Operator-Approved GTM Tools

Curated GTM directory. **Horizon Halo** design language (green console, JetBrains Mono NL). Only tools that clear the operator bar.

**Live:** [https://veigapunk.github.io/halo/](https://veigapunk.github.io/halo/)

## Design language

From [ds4cc.com](https://ds4cc.com) / [Horizon Halo](https://veigapunk.github.io/horizon-halo-comma-design/):

- Green console: `#51ff00` on `#050605` / `#0a0c0a` / `#121612`
- JetBrains Mono NL (ligatures off)
- Flat UI, peripheral confidence glow
- No sparkles. No silver B&W.

## Structure

| Path | Purpose |
| --- | --- |
| `docs/` | **GitHub Pages** static site (deployed) |
| `src/` | Full TanStack Start app (local / Grok preview) |
| `scripts/generate-static-site.mjs` | Regenerates `docs/` from tool data |

## Local

```bash
npm install
npm run dev                 # interactive app on :8080
node scripts/generate-static-site.mjs   # refresh docs/ for Pages
```

## License

MIT · VeigaPunk
