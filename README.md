This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## The users are placed in services/users.json

## Translations are placed in public/locales

## Security related improvements:

- using hash algorithm for password
- when getting users data for forgot password (to check if such email exists) omit the "password" field from response
- add max login attemps functionality for particular email
