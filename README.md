# SonarPilot — Marketing Site

High-tech marketing site for **SonarPilot** — turns real-estate phone calls into
organized work (contacts, properties/deals, follow-up tasks, meetings).

Built with **Vite + React + Framer Motion + Lenis** (smooth, scroll-driven motion).

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to /dist
npm run preview  # preview the production build
```

## What's inside

- **Lenis** inertia smooth-scrolling (`src/hooks/useLenis.js`)
- **Animated canvas** sonar/particle background (`SonarBackground.jsx`)
- **Scroll-driven** timeline that draws itself + scroll progress bar
- **Live demo** — a scripted transcript streams in and auto-populates the
  Contact / Property / Tasks / Meeting cards (`DemoShowcase.jsx`)
- Bento feature grid, animated stat counters, security section, CTA, footer
- Fully responsive + `prefers-reduced-motion` aware

## Deploy — GitHub Pages + custom domain (sonarpilot.co via IONOS)

### 1. Push to GitHub
```bash
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

### 2. Enable Pages
Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The workflow in `.github/workflows/deploy.yml` builds and deploys on every push
to `main`. (`public/CNAME` already pins the custom domain to `sonarpilot.co`.)

### 3. Point IONOS DNS at GitHub Pages
In IONOS → **Domains → sonarpilot.co → DNS**, set:

**Apex (`sonarpilot.co`) — four A records:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
(Optional, recommended — four AAAA records for IPv6:)
```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

**`www` subdomain — CNAME:**
```
www.sonarpilot.co  ->  <you>.github.io
```

Delete any conflicting IONOS parking/A records first. DNS can take up to a few
hours to propagate.

### 4. Finish in GitHub
Settings → Pages → **Custom domain** = `sonarpilot.co` → Save, then tick
**Enforce HTTPS** once the certificate is issued.

## Assets

The logo lives at `public/logo-mark.png` and `src/assets/logo-mark.png`. Replace
both to swap branding.
