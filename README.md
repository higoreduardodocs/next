Application developed in Next and PostgreSQL

> :fire: Development

```
  cd web && bun run db:migrate && bun run db:seed
  cd web && bun run dev
```

> :fire: Production

```
  NEXT_PUBLIC_APP_URL=`https://finance-tutorial-henna.vercel.app`
```

> :gear: Environment Variables

- Clerk public KEY: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY `web`
- Clerk public KEY: CLERK_PUBLISHABLE_KEY `web`
- Clerk secret KEY: CLERK_SECRET_KEY `web`
- Clert sign in URL: NEXT_PUBLIC_CLERK_SIGN_IN_URL `web`
- Clert sign up URL: NEXT_PUBLIC_CLERK_SIGN_UP_URL `web`
- PostgreSQL URL: DRIZZLE_DATABASE_URL `web`
- App URL: NEXT_PUBLIC_APP_URL `web`

> :thought_balloon: `Antonio`

![Cover](./assets/cover.png)
