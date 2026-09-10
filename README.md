# Technical Artist Portfolio — GitHub Pages

A zero-dependency static portfolio site generated from the final 23-page PDF.

## Deploy

1. Create a **public** GitHub repository named `YOUR_GITHUB_USERNAME.github.io`.
2. Upload everything in this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch** → `main` → `/ (root)` → **Save**.
5. Your site will be available at `https://YOUR_GITHUB_USERNAME.github.io/` after GitHub finishes deployment.

## Structure

- `index.html` — page shell and metadata
- `style.css` — responsive desktop/mobile layout
- `script.js` — page generation, page counter, full-screen zoom viewer
- `assets/full/` — 1920×1080 WebP pages
- `assets/preview/` — 960×540 mobile WebP pages
- `portfolio.pdf` — downloadable original PDF
- `.nojekyll` — serves the folder as a plain static site

No npm, framework, build step, analytics, ads, or external CDN is used.
