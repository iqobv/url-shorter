# Instalation

## Edit hosts file

Edit hosts file to add local domains

1. Run the following commands in Command Prompt as Administrator:

   ```bash
   cd C:\Windows\System32\drivers\etc
   notepad C:\Windows\System32\drivers\etc\hosts
   ```

2. Paste the following lines at the end of the file:

   ```
   127.0.0.1 local.domain
   127.0.0.1 s.local.domain
   127.0.0.1 api.local.domain
   ```

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
