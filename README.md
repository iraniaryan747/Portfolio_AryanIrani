# Aryan Irani — 3D Portfolio

Premium, immersive single-page portfolio cloned from the interaction language, motion depth, and structure of [akashrmalhotra/3d-portfolio](https://github.com/akashrmalhotra/3d-portfolio), re-skinned for **Aryan Irani** (engineering management, analytics, computer vision, executive systems).

## Design system (reference clone)

- **Typography / surface:** Geist, deep navy canvas (`#0a0e17`), teal accent (`#5eead4`), gradient headlines, high-contrast hero typography.
- **Layout:** Full-viewport hero with fixed 3D character on desktop, stacked flow on mobile; section rhythm matches the original (hero → about → capability cards → timeline career → work carousel → research timeline → physics tech stack → contact).
- **Motion:** GSAP ScrollSmoother scrubbing, SplitText reveals, scroll-linked character camera + monitor beat, career/research timeline fills, marquee loader.
- **3D:** Encrypted GLTF character (`public/models/character.enc`), Draco, custom lighting; R3F + Rapier tech-sphere pit with post-processing (N8AO) and HDR environment.

## Site architecture (your build)

| Area | Role |
|------|------|
| `src/App.tsx` | Lazy-loads `Character` + `MainContainer`, loading gate |
| `src/components/MainContainer.tsx` | Section order, desktop/mobile 3D placement |
| `src/components/Landing.tsx` | Hero copy + rotating Systems/Research lines |
| `src/components/About.tsx` | Narrative bio |
| `src/components/WhatIDo.tsx` | Two-up capability cards (split animation handoff) |
| `src/components/Career.tsx` | Experience timeline (`#experience`) |
| `src/components/Work.tsx` | Featured work carousel (`#work`) |
| `src/components/Research.tsx` | Publications + active lab (`#research`) |
| `src/components/TechStack.tsx` | R3F physics orbs (`#skills`) |
| `src/components/Contact.tsx` | Contact, education, certs, leadership |
| `src/components/Character/*` | Three.js scene, load + GSAP hooks |
| `src/config/placeholders.ts` | **Central URL/file stubs** |
| `src/components/utils/GsapScroll.ts` | Character + career + research scrub timelines |
| `src/components/utils/initialFX.ts` | Post-loader hero SplitText + loops |

## Component tree (simplified)

```text
LoadingProvider
└─ Loading (fullscreen)
└─ main
   ├─ MainContainer
   │  ├─ Cursor
   │  ├─ Navbar (ScrollSmoother)
   │  ├─ SocialIcons
   │  ├─ smooth-wrapper / smooth-content
   │  │  ├─ Landing (mobile: Character)
   │  │  ├─ About
   │  │  ├─ WhatIDo
   │  │  ├─ Career
   │  │  ├─ Work
   │  │  ├─ Research
   │  │  ├─ TechStack (lazy, desktop)
   │  │  └─ Contact
   └─ Character (lazy, desktop fixed 3D)
```

## Getting started

**Requirements:** Node.js 18+, npm 9+.

```bash
cd aryan-3d-portfolio
npm install
npm run dev
```

Open the printed local URL (e.g. `http://localhost:5173`).

```bash
npm run build    # production bundle → dist/
npm run preview  # verify dist locally
```

### Large assets

If you copied only source without `public/models`, `public/images`, or HDR from the reference repo, run a fresh clone and copy `public/` over, or clone this project from a machine with Git LFS if the author moves binaries there. The encrypted model path is `/models/character.enc` (see `character.ts`).

## Deployment

1. `npm run build`
2. Upload `dist/` to Netlify, Vercel, Cloudflare Pages, etc.
3. Ensure **HTTPS** (required for some CDN texture loads in `TechStack.tsx`).

## GSAP

Uses GSAP core with ScrollTrigger, ScrollSmoother, and SplitText. Follow [GSAP licensing](https://gsap.com/docs/v3/Installation/) for your use case.

## Files to edit for your launch checklist

| File / folder | What to change |
|---------------|----------------|
| `src/config/placeholders.ts` | Résumé path, GitHub username, IEEE paper URL, project demo URLs |
| `src/components/Landing.tsx` | Hero lines if your positioning shifts |
| `src/components/About.tsx` | Story beats |
| `src/components/Career.tsx` | Roles, metrics, dates |
| `src/components/WhatIDo.tsx` | Capability tags |
| `src/components/Work.tsx` | Featured slides, copy, `link` fields |
| `src/components/Research.tsx` | Publications, lab narrative, IEEE link text |
| `src/components/Contact.tsx` | Phone, extra links, certification wording |
| `src/components/Navbar.tsx` | Center LinkedIn label if URL changes |
| `src/components/SocialIcons.tsx` | Icon set / ordering |
| `src/components/Loading.tsx` | Marquee phrases |
| `src/components/TechStack.tsx` | Icon CDN URLs in `imageUrls` |
| `public/images/project-*.svg` | Replace with real screenshots/WebP |
| `public/` | Add `Aryan_Irani_Resume.pdf` (or your filename) and update placeholders |
| `src/components/styles/*.css` | Micro-tweaks to spacing/tokens |
| `index.html` | `<title>` / meta |

## Credit

Base experience derived from Akash Malhotra’s MIT-licensed portfolio; content, copy, sections, and branding are tailored for Aryan Irani.

## GitHub Pages

Live site: **https://iraniaryan747.github.io/Portfolio_AryanIrani/** (deployed via `.github/workflows/deploy-github-pages.yml` on push to `main`).
