# Project history and context (for AI assistants)

Read this file first in a new session. It records what was built, why, and what is still open.
Last updated: 2026-11-27, branch `ui/redesign-professional`.

## 1. Who and what

- **Client:** Vo Thi Minh Phuong (Prisca Vo), MBA. Lecturer & Subject Leader at FPT University HCMC (Faculty of Economics and Law), Director of PHTSO (PH Transform Solution), founder of Sourcez Academy.
- **Purpose:** read-only academic portfolio, mainly for the School of Business, International University (IU), VNU-HCM (faculty position + PhD candidacy). Audience is an academic panel, so the tone is serious and easy to scan.
- **Developer:** Lam Anh Khoi (FPT student, frontend / UI-UX). He talks in Vietnamese, commits and pushes himself with GitKraken. **AI may commit locally but must never push.**
- **Run:** `npm install`, `npm run dev` (http://localhost:5173). Deploy target later: Vercel (`vercel.json` already rewrites every path to `index.html`).

## 2. Source documents (not in the repo)

| Document | Location | Used for |
|---|---|---|
| Academic CV (docx) | `C:\Users\Admin\Downloads\Academic_Research_CV_Vo_Thi_Minh_Phuong_IU_Final.docx` | all content; exported to `public/files/Prisca-Vo-CV.pdf` with Word |
| Conference paper (PDF, 32 pages) | Hermes attachments, `63_Strategic_Sourcing_in_the_Apparel_Industry_in_Vietnam.pdf` | abstract, keywords, method on the Research page |
| Palette screenshots | sent in chat | Maastricht Blue `#0A2338`, Lime `#30D848` (later dropped), secondary blue/orange (unused) |
| Logo (symbol only) + Sourcez Academy logo | sent in chat | favicon only |
| Portrait | `public/images/portrait.jpg` (960x1280) | Home hero |

Rules agreed with Khoi:
- Never invent facts about the client. Numbers must be countable from the CV (27+ years industry, 4+ years teaching, 13 courses, 2 Excellent Lecturer Awards).
- The paper PDF is **not** hosted: its copyright page forbids redistribution without author and publisher consent. Only abstract, metadata, citation and a link to https://vnuhcmpress.edu.vn are shown.
- CV typo fixed on the web only: "Itochu / Prominent US Adidas" -> "Itochu / Prominent US, Adidas" (client should fix the docx).

## 3. Tech stack and structure

React 19 + Vite + Tailwind CSS v4 (`@theme` tokens in `src/styles/index.css`) + React Router (browser router) + react-i18next + Motion (`motion/react`) + lucide-react + tailwind-merge. Font: Montserrat Variable (includes Vietnamese).

```
src/
  App.jsx                 routes + redirects from old URLs
  config/site.js          language-neutral data: SITE (cv, portrait, publication URL), CONTACT, NAV,
                          INDUSTRY_ORGS, EVIDENCE_FILES (scan per evidence code)
  i18n/index.js           auto-loads locales/<lang>/<namespace>.json, English default, choice saved in localStorage 'lang'
  i18n/locales/en|vi/     common, home, teaching, research, industry, talks, evidence (same keys in both languages)
  layouts/RootLayout.jsx  header, page transition, footer, scroll progress, back-to-top
  pages/                  HomePage, TeachingPage, ResearchPage, IndustryPage, TalksPage, EvidencePage, NotFoundPage
  components/layout/      Header, Footer, LanguageSwitcher, PageChrome (progress bar, back to top, skip link)
  components/ui/          Primitives (Container, Section, SectionHeading, Card, Chip, IconBadge, Label), Button,
                          CvButton, PageHeader, Timeline, Accordion, CopyButton, Portrait, ContactList, FilterChips, icons
  components/motion/      Reveal, CountUp, PageTransition
  components/ErrorBoundary.jsx
scripts/check-i18n.js     EN/VI key parity
legacy/                   earlier single-file site + UI showcase demos (not built)
```

Conventions:
- **No visible text hard-coded in components.** Edit the JSON in both `en` and `vi`, then `npm run check:i18n`.
- `cn()` uses tailwind-merge, so a caller's `bg-*` overrides a component default.
- Motion is moderate and wrapped in `MotionConfig reducedMotion="user"`. No video backgrounds, scroll hijack or custom cursor.
- Gates before reporting done: `npm run lint`, `npm run check:i18n`, `npm run build`, then check every route in EN/VI at 1440px and 390px (console errors, 404s, horizontal overflow, one h1 per page).

## 4. Pages (current)

| Route | Content | JSON |
|---|---|---|
| `/` | navy hero + portrait, 4-number stats card, profile, PhD objective (IU), education, languages, featured publication, teaching recognition teaser, explore strip | `home.json` |
| `/teaching` | appointments timeline (FPT, CFVG, Greenwich, VALOMA), sticky awards panel, 13 courses in 2 tiers, certifications | `teaching.json` |
| `/research` | publication card (finding, abstract, method stats 189/245, keywords, APA citation + copy, publisher link), MBA thesis, PhD proposal (accordion), research interests | `research.json` |
| `/industry` | 27+ years panel, organisations, 7-role timeline | `industry.json` |
| `/talks` | talks / workshops / forums / mentoring with filter chips, community mindfulness talks | `talks.json` |
| `/evidence` | 13 cards E-01..E-13 with type filter and scan placeholders | `evidence.json` + `EVIDENCE_FILES` |

Redirects: `/about` -> `/`, `/recognition` -> `/teaching`, `/talks-events` -> `/talks`, `/other` -> `/industry`.

## 5. Brand (current)

| Role | Colour | Usage |
|---|---|---|
| Base | White, Navy 50 `#F3F5F7` | backgrounds |
| Primary | Navy `#0A2338`, Navy 950 `#061827` | text, hero, page headers, footer, feature cards |
| Accent | Gold `#B8914A` rules; `#C9A15A` text on navy (6.7:1); `#8C6A2B` text on white (5.0:1) | small rules, dates, active nav, progress bar |

Navbar brand is text "Prisca Vo, MBA". Favicon is the PHTSO/Sourcez symbol on a white tile (`public/favicon.ico`, `favicon-48.png`, `apple-touch-icon.png`, `icon-512.png`).

## 6. Timeline of work

1. **Single-file portfolio** (`legacy/index.html`): GSAP + Lenis, red/cream style from weconnor.com, motion ideas from lifung.com, EN/VI hash router. Cleaned of AI/prompt traces for the client. A navy/green "Canva" variant also existed.
2. **UI showcase demos** (`legacy/ui-showcase/`): Selat (freight, scroll-scrubbed video), squish (juice brand + cart), Nep Stays (booking flow). Shown to prove the team's skill.
3. **React rebuild** (commit `4dab06c`, on `main`): 6 pages Home / About / Research / Talks & Events / Recognition / Other, palette white 60 / navy 30 / lime 10, Montserrat, EN/VI i18n.
4. **Client assets** (`6d8c790`): logo symbol in navbar + favicon, CV PDF download, paper details on Research.
5. **Portrait** (`41974b6`): `public/images/portrait.jpg` in the Home hero.
6. **Redesign after reviewer feedback** (`ccca9af`, branch `ui/redesign-professional`). Feedback (from the client side, rated the old layout 7/10): split Teaching and merge Recognition into it; rename Other to Industry Experience; add an Evidence page with certificate thumbnails and evidence codes; 4 headline numbers on Home; drop green, keep navy like the CV; show "Prisca Vo, MBA" instead of the PHTSO logo. Khoi chose navy + restrained gold accent, favicon unchanged, no mockup round. Also fixed density: navy hero, overlapping stats card, About merged into Home, compact page headers, two-column pages with sticky side panels.

## 7. Open items

- Branch `ui/redesign-professional` is pushed (`origin` at `ccca9af`) but **not merged into `main`**; merge after Khoi and the client approve.
- Evidence scans: put files in `public/evidence/`, fill `EVIDENCE_FILES` in `src/config/site.js`. **Codes E-01..E-13 are provisional**; match them to the client's real Evidence Portfolio index.
- Vietnamese copy written by the AI (abstract translation, menu names "Doanh nghiệp", "Hội thảo & Cộng đồng", title "Trưởng bộ môn") should be checked by the client.
- `publicationUrl` points to the publisher home page; replace with a direct link to the proceedings if the client has one.
- The CV PDF includes industry experience, phone and both emails, and is publicly downloadable. Re-export from Word if the docx changes.
- A vector (SVG) logo would be sharper than the PNG extracted from a JPG.
- Production JS bundle is about 650 KB (about 200 KB gzip); route-level lazy loading is an option before deploy.
- Deploy to Vercel (not done yet). The git remote still points at the old `first_real_project` URL (GitHub redirects).

## 8. How to continue in a new session

1. Read this file and `README.md`.
2. `git log --oneline -10` and `git branch` to see where work stopped.
3. Ask Khoi before structural or palette changes; he wants options explained with concrete examples. Answer him in Vietnamese, keep technical terms in English, show code changes as diffs or snippets.
4. Update section 6 and 7 of this file when you finish a piece of work.

## 9. Environment and tool pitfalls (they cost real time)

- **Windows + git-bash through the Hermes terminal tool.** Native programs need `C:/...` paths, not `/c/...`. `cd` is a bash builtin so it accepts either.
- **Do not start a command that mentions `vite` in the foreground** if it launches a server: the tool refuses it. Run `npm run dev` with `background=true`, or use a dev server Khoi already has running on 5173.
- **Word and the CV.** Exporting the docx to PDF through PowerShell COM closed the Word instance Khoi had open (`Quit` threw an RPC error). Copy the docx to a scratch path first, and tell him before touching Word again; check for `~$*.docx` lock files.
- **Phone numbers are masked in tool output** (`tel:+849****0837`). Count the digits in the file before "fixing" a value that is not broken.
- **Python heredocs with apostrophes** (`Bachelor's`, `Cronbach's`) break the shell wrapper. Write the script with `write_file` and run `python path/script.py`. System Python has no `docx`/`fitz`/`numpy`; use `uv run --with <pkg> python script.py`.
- **Reading the paper PDF.** Page 1 is a scan; every other page has a text layer. `uv run --with pypdfium2` renders pages and `get_textpage().get_text_range()` extracts text.
- **Word PNG logos ship as JPGs.** Remove the white background by un-premultiplying: `alpha = (255 - min(rgb)) / 195`, then `rgb = (rgb - 255*(1-a)) / a`. Put favicons on a white tile so the navy half stays visible in dark browser tabs.
- **QA harness:** `C:\Users\Admin\AppData\Local\hermes\profiles\greenbowl\skills\design\gsap-lenis-single-file-site\scripts\qa_harness.py`. Load it with `exec(open(path).read())` inside a `browser_exec` call, then `qa_setup()`, `qa_viewport('desktop'|'mobile')`, `qa_open(url, storage=[('localStorage','lang','vi')])`, `qa_sweep()`, `qa_health()`, `qa_snap_sections()`. Take screenshots and look at them; `qa_health()` alone does not catch layout problems.
- **i18n restructuring:** move keys between namespaces with a Python script, never by retyping copy, then run `npm run check:i18n`.
- **`cn()` is tailwind-merge**, so class order decides the winner; do not add `bg-*` defaults that fight a caller's colour.
- **Breakpoints are only `md` 768 / `lg` 1024 / `xl` 1280** (`@theme` in `src/styles/index.css`, `--breakpoint-*: initial`). `sm:` and `2xl:` no longer exist, so they silently do nothing; use `md:`. Full nav shows from `xl`.
- **No `layoutId` inside the sticky header.** motion measures layoutId in page coordinates; when a language switch shortens the page and `scrollY` clamps, the nav underline and language pill flew in vertically. They now animate `x`/`width` measured inside their own container (`Header.jsx` `DesktopNav`, `LanguageSwitcher.jsx`). `layoutRoot` on the header did not fix it.
- **Git:** commit locally with a message file (`git commit -F msg.txt`) because `&` in a `-m` message trips the tool. Never push.

## 10. Verification recipe (about 5 minutes)

```bash
npm run lint && npm run check:i18n && npm run build
```
Then in the browser: 6 routes x EN/VI x 1440 and 390, checking console errors, 4xx requests, `overflowX` 0, one `h1` per page; switch language live on one page (h1, `<html lang>`, title, localStorage); open `/about` to confirm the redirect; screenshot the hero and one dense page and look at them.

