# LINK SHORTNER

Simple Link Shortner App Using NextJS, Prisma, Next-auth and CockroachDB.

## Tech Stack

- NextJs
- Prisma
- PostgreSQL/CockroachDb

## How To Use:

1. clone this repository to your local
   ```sh
   git clone https://github.com/lutfidmz/link-shortner-adam.git
   ```
2. Install dependency using npm or yarn

   ```sh
   npm i
   ```

3. Rename .env-example to .env / .env.local and fill the env needed

- URL = your base URL
- DATABASE_URL = database connection url
- NEXTAUTH_SECRET = your nextauth secret key you can generate using `openssl rand -base64 32`
- GITHUB_SECRET = your github secret key
- GITHUB_ID = your github oauth id

4. Generate prisma client
   ```sh
   npx prisma generate
   ```
5. Run the app using npm
   ```sh
   npm run dev
   ```
