
# Infinite Scrolling (React + Vite + TypeScript)

This small demo app shows an infinite-scrolling masonry image gallery using the Unsplash API. It is built with React, Vite, TypeScript, Material UI and Axios.

**Live demo:** run locally with the commands below.

**Warning:** The demo currently uses a client id in `src/App.tsx`. Replace it with your own Unsplash Access Key to avoid rate limits and to follow Unsplash API terms.

**Features**
- **Infinite scroll:** Loads more photos as you scroll near the bottom of the page.
- **Masonry layout:** Uses MUI `ImageList` masonry variant for a tiled layout.
- **Lazy loading:** Images use browser lazy loading (`loading="lazy"`).
- **Simple, minimal codebase:** Designed as a compact example of infinite-scrolling with React.

**Tech stack**
- React + TypeScript
- Vite (dev server, build)
- Material UI (`@mui/material`, `@mui/lab`)
- Axios for HTTP requests

**Quick start**

1. Install dependencies

```powershell
npm install
```

2. Start dev server

```powershell
npm run dev
```

Open http://localhost:5173 (Vite default) in your browser.

**Build and preview**

```powershell
npm run build
npm run preview
```

**Where to look in the code**
- `src/App.tsx` — Main app component. It fetches photos from the Unsplash API using Axios, maintains `images` and `page` state, listens for window scroll events, and appends results to the list.
- `src/main.tsx` — App bootstrap (React + Vite).
- `index.html`, `vite.config.ts` — Vite config and HTML entry.

**How it works (short)**
- On mount and whenever `page` changes, `App` calls the `getData` async function to request 10 photos from the Unsplash `/photos` endpoint.
- When the window scroll position is near the bottom (`document.body.offsetHeight - 200`), `page` increments which triggers the next fetch and appends new images to state.

**Customize / Notes**
- Replace the `client_id` query parameter in the request URL inside `src/App.tsx` with your own Unsplash Access Key.
- Consider moving the API key to an environment variable (Vite `.env` and `import.meta.env`) rather than hard-coding it.
- Add error handling for network failures and a backoff/retry strategy for rate limits.
- If you expect many images, consider virtualization/windowing to reduce DOM nodes.

**Next steps / Suggestions**
- Use `VITE_UNSPLASH_KEY` in a `.env` file and read it via `import.meta.env.VITE_UNSPLASH_KEY`.
- Add a search box and filter options.
- Add tests and CI linting.

**License**
This repository contains demo code. Check the licenses of dependencies you use in production.

---
If you want, I can swap the hard-coded client id for a `VITE_` env variable and update `src/App.tsx` accordingly.
