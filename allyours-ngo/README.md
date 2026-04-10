# Allyours NGO — Web Site

Production landing and fundraising experience for **Allyours NGO**, built with **Next.js** (App Router), **TypeScript**, and **Tailwind CSS**. Public pages load content from **Firebase** (Firestore) and **Cloudinary** (images) where configured; sensitive writes and admin tools run on the **server** using the Firebase Admin SDK.

---

## Overview

| Area | Description |
|------|-------------|
| **Marketing** | Home (`/`), Support Us (`/support-us`), Contact (`/contact-us`) |
| **Content** | Team members, podcasts, testimonials, and donation reporting driven by Firestore + API routes |
| **Admin** | Protected `/admin/*` area: Firebase Authentication (email + Google), session cookies, CRUD-style tools |
| **Assets** | Images via Cloudinary (unsigned preset); **donation report PDF** as a static file under `public/` |

---

## Tech Stack

- **Framework:** Next.js 15, React 19, App Router  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS  
- **Backend / data:** Firebase (client SDK + Admin SDK), Firestore  
- **Media:** Cloudinary (browser uploads for images)  
- **Analytics:** Google Analytics 4 (optional)  

---

## Prerequisites

- **Node.js** 18 or newer  
- **npm** (or pnpm / yarn)  
- A **Firebase** project with Firestore (and Authentication if you use admin)  
- Optional: **Cloudinary** account for image uploads  
- Optional: **App Check** (reCAPTCHA v3) if you enforce it on Firestore  

---

## Getting Started

```bash
git clone <repository-url>
cd allyours-ngo
npm install
cp .env.example .env.local
# Edit .env.local with your Firebase, Cloudinary, and GA values (see below).
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production server locally |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (write) |

---

## Environment Variables

Copy **`.env.example`** to **`.env.local`** and fill in values. Do **not** commit secrets.

**Groups:**

1. **`FIREBASE_SERVICE_ACCOUNT_KEY`** — JSON string of a Firebase service account (Project settings → Service accounts). Required for server APIs, Admin SDK Firestore access, and creating admin session cookies.  
2. **`NEXT_PUBLIC_FIREBASE_*`** — Web app config from Firebase Console (same project as the service account).  
3. **Optional:** `FIRESTORE_DATABASE_ID` / `NEXT_PUBLIC_FIRESTORE_DATABASE_ID` if you use a non-default Firestore database.  
4. **Optional:** App Check — `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG` for local debugging.  
5. **Cloudinary** — `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` for **images** (donations proofs, members, podcasts, hero uploads).  
6. **Optional:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_YOUTUBE_CHANNEL_URL`.

The donation report PDF is **not** configured via env: place **`public/donation-report.pdf`** and redeploy.

---

## Firebase

### Authentication (admin)

Enable **Email/Password** and **Google** under Authentication → Sign-in method. Add **authorized domains** (e.g. `localhost`, your production host).

Admin routes under `/admin` (except `/admin/login` and `/admin/sign-up`) require a valid **session cookie** issued after sign-in (`POST /api/auth/session`). Sign-out calls `POST /api/auth/logout`.

### Firestore

Collections used by the app include (among others) **`members`**, **`podcasts`**, **`donations`**, **`testimonials`**, **`posts`**. Rules live in **`firestore.rules`**. Deploy when you change them:

```bash
firebase deploy --only firestore:rules
```

**Donations** are intended to be read/written only via the **Admin SDK** (no direct client access in rules).

### App Check

If Firestore enforces App Check, configure the web app in Firebase and set the reCAPTCHA site key. The server still reads via the Admin SDK where implemented, but client reads may fail without a valid App Check token.

---

## Admin Routes

Sign in at **`/admin/login`** (or create an account at **`/admin/sign-up`** if you allow it). After authentication, **`/admin`** lists shortcuts.

| Path | Purpose |
|------|---------|
| `/admin` | Dashboard links |
| `/admin/members` | List / edit / delete team members |
| `/admin/members/new` | Create member (server API) |
| `/admin/member-image` | Update a member photo by Firestore document ID + Cloudinary |
| `/admin/podcasts` | List / edit / delete podcast entries |
| `/admin/podcasts/new` | Create podcast episode |
| `/admin/donations` | Toggle which donations appear in the public donor table |
| `/admin/donation-report` | Instructions for the static **`public/donation-report.pdf`** file |

> **Security:** Treat admin URLs as privileged. Tighten access further (e.g. allowlisted emails, custom claims) before high-traffic production if needed.

---

## Public API Routes

| Route | Role |
|-------|------|
| `GET /api/members` | List members (for homepage team section) |
| `POST /api/members` | Create member (used by admin flow; service account) |
| `GET/POST /api/podcasts` | List / create podcasts |
| `GET /api/donations?report=1` | Donations marked visible for the Support Us table |
| `POST /api/donations` | Record a donation (site forms) |
| `GET /api/donation-report` | Returns `{ url }` for the static PDF if `public/donation-report.pdf` exists |
| `POST /api/auth/session` | Exchange Firebase ID token for httpOnly session cookie |
| `POST /api/auth/logout` | Clear session and revoke refresh tokens |

---

## Donation Report PDF (Static)

1. Add or replace **`public/donation-report.pdf`**.  
2. Commit and deploy (or restart the dev server).  
3. Download buttons (Support Us + home Section 6) call **`/api/donation-report`** and link to **`/donation-report.pdf`** when the file is present.

---

## Project Structure (high level)

```
allyours-ngo/
├── public/                 # Static assets; donation-report.pdf lives here
├── src/
│   ├── app/                # App Router: pages, layouts, API routes, admin segments
│   ├── components/         # UI (sections, Nav, admin clients, etc.)
│   ├── lib/                # Firebase client/admin helpers, auth cookie, utilities
│   └── services/           # Firestore client helpers, Cloudinary upload
├── firestore.rules
├── firebase.json
├── next.config.ts
└── package.json
```

---

## Deployment

1. Set **environment variables** on the host (match `.env.local` / `.env.example`).  
2. Build: `npm run build`.  
3. Start: `npm run start` (or use the platform’s Next.js preset).

**Vercel** (and similar) work well: connect the repo, add env vars, deploy. Ensure **authorized domains** in Firebase include your production hostname.

After changing **Firestore rules**, run **`firebase deploy --only firestore:rules`** from a machine with the Firebase CLI logged in.

---

## Contributing

1. Fork the repository and create a branch for your change.  
2. Keep commits focused; run **`npm run lint`** before opening a PR.  
3. Open a pull request with a clear description of behavior and any new env vars or Firebase steps.

---

## License

Add a `LICENSE` file at the repository root when you publish or distribute this codebase.

---

**Allyours NGO** — web presence for programs, impact, and ways to support the mission.
