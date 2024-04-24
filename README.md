docker compose up -d && docker inspect mysql | grep IPAddress
cd web && yarn && yarn prisma db push && yarn prisma db seed && yarn prisma studio && yarn dev