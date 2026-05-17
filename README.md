# Evolve_NGO

## Deployment

This project uses Next.js on Vercel with Prisma + Supabase, plus Razorpay for payments.

### Required Vercel environment variables

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

### Optional environment variables

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `ADMIN_USERS`

### Database URL setup

- `DATABASE_URL`: use Supabase pooled connection URL (runtime).
- `DIRECT_URL`: use direct Postgres connection URL (migrations).
- If password contains `@`, encode it as `%40`.

### Vercel build behavior

Vercel build command is:

```bash
npm run build
```

It expands to:

```bash
prisma generate && next build
```

This avoids migration-time deployment failures during build.

### Run migrations

Run migrations separately when needed:

```bash
npm run db:migrate:deploy
```
