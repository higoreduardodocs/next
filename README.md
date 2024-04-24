Application developed in Next and Mongo

> :fire: Development

```
  docker compose up -d && docker inspect mongo | grep IPAddress
  cd web && yarn && yarn prisma db push && yarn prisma db seed && yarn dev
```

> :gear: Environment Variables

- Mongo URL: DATABASE_URL `web`
- JWT secret: NEXTAUTH_JWT_SECRET `web`
- Next secret: NEXTAUTH_SECRET `web`
- GitHub ID: GITHUB_ID `web`
- GitHub secret: GITHUB_SECRET `web`
- Google ID: GOOGLE_CLIENT_ID `web`
- Google secret: GOOGLE_CLIENT_SECRET `web`

> :thought_balloon: `Antonio`

![Cover](./assets/cover.png)

> :dart: Documentation

- Google callback: `http://localhost:3000/api/auth/callback/google`
- Github callback: `http://localhost:3000`
- Lint: `"rules": {"@next/next/no-img-element": "off"}`
