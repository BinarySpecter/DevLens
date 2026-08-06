# DevLens — Open Source Audit Report

**Date:** 2026-08-07
**Project:** DevLens (formerly 2txt)
**Audit type:** Pre-open-source release audit

---

## ✅ Changes Made

| File | Change |
| --- | --- |
| `package.json` | Renamed `2txt` → `devlens`; added description and keywords. `repository`/`homepage`/`author` omitted (final repo URL unknown). |
| `package-lock.json` | Root package name synced to `devlens`. |
| `README.md` | Fully replaced the original 2txt README (which contained the old deploy button linking to `ai-ng/2txt` and `2txt.vercel.app`). New README covers description, features, demo placeholder, tech stack, installation, env vars, local run, project structure, future improvements, license. |
| `.gitignore` | Added `.env` / `.env.*` (excluding `.env.example`) so a plain `.env` file can never be committed. |
| `.env.example` | Created with `GOOGLE_GENERATIVE_AI_API_KEY` placeholder. |
| `app/layout.tsx` | Added full SEO metadata: Open Graph (title/description/type/locale) and Twitter card metadata matching DevLens branding. |
| `app/opengraph-image.png` | Removed — byte-identical to the original `ai-ng/2txt` repo's image (md5 `4364ca91…`), i.e. old 2txt branding. |
| `pnpm-lock.yaml` | Removed — stale lockfile from the original repo. The project now installs with npm (`package-lock.json` was regenerated alongside `node_modules` on Aug 4). Having both lockfiles confused Turbopack's workspace-root detection. |

## ⚠ Things Requiring Manual Attention

1. **Open Graph image** — the old one was deleted. Generate a new DevLens-branded `app/opengraph-image.png` (1200×630) or the site will have no social preview card.
2. **Favicon** — no `app/favicon.ico` / `app/icon.*` exists; browsers will 404. Add a DevLens icon.
3. **GitHub links** — `Navbar.tsx:7` and `Footer.tsx:3` hardcode `GITHUB_URL = "https://github.com/"` (a dead placeholder). Set this to your real repository URL after pushing.
4. **Git remote** — `git remote -v` still points to `https://github.com/ai-ng/2txt.git`. Remove it with `git remote remove origin` before pushing to your own repo.
5. **README license link** — README references `./LICENSE` (MIT). No LICENSE file exists yet; create one before release (see License findings).
6. **`.env.local` contains a real Google API key** — it is gitignored and not tracked, so it will not be committed. Still, **rotate the key** (`GOOGLE_GENERATIVE_AI_API_KEY`) since it has been present on disk and may have been shared in other contexts.
7. **Vercel Analytics** — `@vercel/analytics` is initialized in `app/layout.tsx`; disable or remove if you don't want anonymous analytics in production.
8. **`2txt` references** — zero remain in tracked files. If you ever pushed to the old origin, verify GitHub Actions/secrets there are not reused.
9. **Vercel deployment button** in old README was removed — re-add one with your own repo URL if desired.
10. **Original README mentioned `AI_GATEWAY_API_KEY`** — the current code no longer uses the AI Gateway; the only required var is `GOOGLE_GENERATIVE_AI_API_KEY`.

## 🗑 Files Removed

| File | Reason |
| --- | --- |
| `app/opengraph-image.png` | Old 2txt branding; byte-identical to original repo asset. |
| `pnpm-lock.yaml` | Stale duplicate lockfile; npm is the active package manager. |

## 📦 Dependencies Worth Removing

| Package | Reason |
| --- | --- |
| `@ai-sdk/openai` | Not imported anywhere in `app/`. |
| `@ai-sdk/react` | Not imported anywhere (no `useChat`/`useObject`); `generateObject` is used only server-side via the core `ai` package. |

Remove with: `npm uninstall @ai-sdk/openai @ai-sdk/react`

All other dependencies (`@ai-sdk/google`, `@tabler/icons-react`, `@vercel/analytics`, `ai`, `clsx`, `geist`, `motion`, `next`, `react`, `react-dom`, `sonner`, `zod`) are actively used.

## 📜 License Findings

- **Original repo (`ai-ng/2txt`):** `license: null` on GitHub — **no license declared**. Legally, unlicensed code is "all rights reserved" to the original author (Nick Oates).
- **Current repo:** the app has been heavily rewritten (new name, new UI, new API contract, new components) but the git history still contains the original author's commits, and some code structure derives from the original.
- **Obligations:** with no license on the original, there is no explicit grant to use/redistribute it. The remaining overlap is minimal (e.g. `next.config.ts` CSP header idea, general structure) and the code has been substantially transformed.
- **Recommended action:**
  1. Recreate git history as your own (see below) so the original commits are no longer published as part of this repo.
  2. Add an **MIT LICENSE** with your name/entity — the README already references it.
  3. Optionally, add a one-line attribution note in the README ("Inspired by / derived from the 2txt project by Nick Oates") to be safe and respectful.
  4. This report does not constitute legal advice; consult counsel if concerned.

## 🔒 Secrets Check

- `.env.local` is ignored (`.env*.local`) and **not tracked** in git. ✅
- No secret values found in any tracked file (scanned for key-like patterns). ✅
- `.gitignore` now also blocks plain `.env`. ✅
- Action: rotate `GOOGLE_GENERATIVE_AI_API_KEY` before/after release (manual).

## 🚀 GitHub Readiness Checklist

- [ ] Remove old remote: `git remote remove origin`
- [ ] Start fresh history (recommended — see Git History below)
- [ ] Add LICENSE file (MIT)
- [ ] Create new DevLens Open Graph image
- [ ] Add favicon
- [ ] Set real `GITHUB_URL` in `Navbar.tsx` and `Footer.tsx`
- [ ] Uninstall `@ai-sdk/openai` and `@ai-sdk/react`
- [ ] Rotate Google API key
- [ ] Decide on Vercel Analytics
- [ ] Create the GitHub repo, push, and (optionally) enable GitHub Pages/CI

## Git History

**Yes, the repo still contains the original `ai-ng/2txt` history** (52 commits by Nick Oates, plus 2 of your own on top). The original repo has no license, so publishing its history is questionable.

**Starting a fresh repository is strongly recommended.** Exact commands:

```bash
# 1. Remove the old remote (safe, reversible)
git remote remove origin

# 2. Snapshot the current tree as a brand-new root commit (keeps your working files)
git checkout --orphan main-new
git add -A
git commit -m "chore: init DevLens (fresh history)"

# 3. Replace main with the clean history
git branch -M main-new main

# 4. Push to your new repository
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

> Alternative: delete `.git` entirely and `git init` again — same result, but loses any stash/reflog.

## Build Verification

- `npm run build` (Next.js 16, Turbopack): ✅ compiled successfully, TypeScript passed, 3 routes generated (`/`, `/_not-found`, `/api`).
- No broken imports, no missing assets, no references to deleted files.

---

## Overall Readiness: **8.5 / 10**

Strong: branding fully renamed, secrets verified, build green, docs complete.
Remaining work is manual (OG image, favicon, LICENSE, remote/history reset, real GitHub URL) — none of it blocks development, but items 1–3 of the checklist should be done before the public push.
