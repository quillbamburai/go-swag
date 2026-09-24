# Typography

Sora for headings (`--font-family-display`). Inter for body, tables, and controls (`--font-family-body`).

| Style | Size | Line height | Family | Tracking |
|---|---|---|---|---|
| h1 | `--text-h1-size` 72px | 84px | Sora | tight |
| h2 | 60px | 64px | Sora | tight |
| h3 | 48px | 52px | Sora | tight |
| h4 | 36px | 40px | Sora | tight |
| h5 | 24px | 28px | Sora | normal |
| h6 | 20px | 24px | Sora | normal |
| body large | 18 / 28 | | Inter | |
| body medium | 16 / 24 | | Inter | |
| body small | 14 / 20 | | Inter | |
| caption | 12 / 16 | | Inter | |

Weights: 400, 500, 600, 700 only.

```
What are you setting?
├── Page or hub title → h5 or h6 (this is a dense app; skip h1–h3 in-product)
├── Card SKU name → h6
├── Table and form copy → body small or medium
└── Badges, timestamps → caption
```

DO: `font-family: var(--font-family-display)` on headings  
DON'T: use Inter for titles or Sora for table cells
