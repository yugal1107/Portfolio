# Portfolio Backend

Express + TypeScript backend for the portfolio admin/data APIs.

## Setup

1. Copy env file:

```bash
cp .env.example .env
```

2. Generate admin password hash:

```bash
npm run hash:password -- your_password_here
```

3. Paste generated hash into `.env` as `ADMIN_PASSWORD_HASH`.

4. Install dependencies:

```bash
npm install
```

5. Run DB migration + seed:

```bash
npm run db:setup
```

6. Start dev server:

```bash
npm run dev
```

## Scripts

- `npm run dev` - start backend in watch mode
- `npm run check` - TypeScript type check
- `npm run build` - build for production
- `npm run db:migrate` - apply SQLite migrations
- `npm run db:seed` - seed default data
- `npm run db:setup` - run migrate + seed
- `npm run hash:password -- <password>` - generate bcrypt hash

## Public APIs

- `GET /api/public/home`
  - Combined payload for home page: settings, projects, skill groups with nested skills.
- `GET /api/public/stories`
  - List of published stories for cards.
- `GET /api/public/stories/:slug`
  - Full published story detail. Story content is returned as `contentMarkdown`.

## Admin Auth APIs

- `POST /api/admin/login`
  - Body: `{ "username": "...", "password": "..." }`
  - Valid credentials are checked against `.env` (`ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`).
  - On success sets an httpOnly auth cookie.
- `POST /api/admin/logout`
  - Clears auth cookie.
- `GET /api/admin/me`
  - Protected route to verify active admin session.

## Admin Content APIs (Protected)

Base path: `/api/admin/content`

- Settings
  - `GET /settings`
  - `PATCH /settings`
- Projects
  - `GET /projects`
  - `POST /projects`
  - `PUT /projects/:id`
  - `DELETE /projects/:id`
- Skill Groups
  - `GET /skill-groups` (includes nested skills)
  - `POST /skill-groups`
  - `PUT /skill-groups/:id`
  - `DELETE /skill-groups/:id`
- Skills
  - `POST /skills`
  - `PUT /skills/:id`
  - `DELETE /skills/:id`
- Stories
  - `GET /stories`
  - `GET /stories/:id`
  - `POST /stories`
  - `PUT /stories/:id`
  - `DELETE /stories/:id`

## Admin Upload API (Protected)

- `POST /api/admin/upload/file`
  - Multipart form-data with `file`.
  - Optional fields:
    - `folder` (default: `portfolio`)
    - `publicIdPrefix` (default: `asset`)
    - `format` (optional target format)
  - Returns Cloudinary `secure_url`, `optimizedUrl`, `publicId` and metadata.

## Optimization policy

- Store image public IDs (`*_public_id`) in DB for Cloudinary uploads.
- Deliver images using controlled variants (fixed transformation set) rather than raw `secure_url`.
- Current frontend variant strategy:
  - avatar: `f_auto,q_auto:good,c_thumb,g_face,w_240,h_240`
  - project card: `f_auto,q_auto:eco,c_fill,w_800,h_480`
  - story card: `f_auto,q_auto:eco,c_fill,w_800,h_480`
  - story hero: `f_auto,q_auto:good,c_fill,w_1200,h_675`
  - story gallery: `f_auto,q_auto:good,c_limit,w_1200`
