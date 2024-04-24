Application developed in Next and MySQL

> :fire: Development

```
  docker compose up -d && docker inspect mysql | grep IPAddress
  cd web && yarn && yarn prisma db push && yarn prisma db seed && yarn prisma studio && yarn dev
```

> :gear: Environment Variables

- Database URL: DATABASE_URL `web`
  `Dev: &&sslcert=/etc/ssl/cert.pem`
  `Prod: &&sslcert=/etc/pki/tls/certs/ca-bundle.crt`
- Client URL: NEXT_PUBLIC_URL `web`
- OpenAI key: OPENAI_API_KEY `web`

> :thought_balloon: `Ed roh`

![Cover](./assets/cover.png)
