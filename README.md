# Minimal Shop

## Local Development

Create `.env` in the project root:

```env
NUXT_SESSION_PASSWORD=your-session-password
DATABASE_URL="postgresql://postgres:123456@localhost:5432/muji_shop?schema=public"
```

Install and start PostgreSQL locally, then create a database named `muji_shop`.

Initialize Prisma and seed home page data:

```bash
npm run db:init
```

Start Nuxt:

```bash
npm run dev
```

Home API:

```txt
GET http://localhost:3001/api/v1/home
```

Docker commands are still available as `npm run dev:docker` and `npm run db:init:docker`.
