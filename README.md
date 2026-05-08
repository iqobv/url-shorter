# Instalation

## Client instalation

```bash
cd client
```

```bash
copy .env.example .env
```

Edit `.env` file

```bash
npm install
npm run dev
```

## Server instalation

```bash
cd server
```

```bash
copy .env.example .env
```

Edit `.env` file

```bash
docker-compose -f .\docker-compose.local.yml -p url_shorter up -d
npm install
npx prisma migrate deploy
npx prisma generate
npm run start:dev
```
