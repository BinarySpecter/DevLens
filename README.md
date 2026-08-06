# DevLens

Upload a coding screenshot and get a structured explanation and fix in seconds.

DevLens turns screenshots of code, terminal output, browser errors, and stack traces into a clear debugging report: the problem, its root cause, a detailed explanation, and a step-by-step fix — powered by Google Gemini and the Vercel AI SDK.

## Features

- **Paste, drop, or upload** a screenshot — supports JPEG, PNG, GIF, and WEBP (up to 4.5 MB)
- **Structured debugging report** — Problem, Root Cause, Explanation, Suggested Fix, and Suggested Code
- **One-click copy** — copy individual sections or the entire analysis
- **Local history** — past sessions are saved in your browser (localStorage) and never leave your machine
- **Works great with** VS Code, Cursor, terminals, DevTools, stack traces, React errors, and more
- **Dark, terminal-inspired UI** with reduced-motion support

## Demo

![DevLens demo placeholder](https://via.placeholder.com/1200x630/09090b/34d399?text=DevLens+Dashboard+Screenshot)

> Screenshots to be added.

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [Vercel AI SDK](https://sdk.vercel.ai) with [Google Gemini 2.5 Flash](https://ai.google.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Motion](https://motion.dev) (animations)
- [Tabler Icons](https://tabler.io/icons)
- [Zod](https://zod.dev) (response schema validation)
- [Sonner](https://sonner.emilkowal.ski) (toasts)

## Installation

```bash
git clone <your-repo-url>
cd devlens
npm install
```

## Environment Variables

Create a `.env.local` file in the project root:

| Variable | Description |
| --- | --- |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Your Google Gemini API key from [AI Studio](https://aistudio.google.com/apikey) |

See [.env.example](.env.example) for a template.

## Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Screenshots are sent to the Gemini API for analysis; nothing is stored on the server.

To build for production:

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── api/route.ts          # POST /api — image analysis endpoint (Gemini)
├── components/           # UI components (Navbar, Hero, UploadArea, ResultsSection, ...)
├── clipboard.ts          # Cross-browser clipboard helper
├── utils.ts              # Zod schema, image type validation, history helpers
├── globals.css           # Tailwind theme + custom animations
├── layout.tsx            # Root layout + metadata
└── page.tsx              # Home page (client-side state and upload flow)
```

## Future Improvements

- Live demo / hosted deployment link
- DevLens-branded Open Graph image and favicon
- Support for multi-image sessions
- Optional sign-in for cloud-synced history
- Streaming responses for faster first results
- Test suite (unit + e2e)

## License

[MIT](./LICENSE)
