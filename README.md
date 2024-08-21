Application developed in Next and PostgreSQL

> :fire: Development

```
  docker compose up -d && docker inspect postgres | grep IPAddress
  cd web && npm i && npm run db:push && npm run dev
```

> :fire: Production

```
  NEXT_PUBLIC_APP_URL=`https://auth-tutorial-henna.vercel.app`
```

> :gear: Environment Variables

- Environment variable: NODE_ENV `web`
- PostgreSQL URL: DATABASE_URL `web`
- App URL: NEXT_PUBLIC_APP_URL `web`
- Github client ID: GITHUB_CLIENT_ID `web`
- Github client secret: GITHUB_CLIENT_SECRET `web`
- Google client ID: GOOGLE_CLIENT_ID `web`
- Google client secret: GOOGLE_CLIENT_SECRET `web`
- Resend API key: RESEND_API_KEY `web`

> :thought_balloon: `Antonio`

![Cover](./assets/cover.png)