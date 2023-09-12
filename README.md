# Prisma

This is my first attempt at using Prisma.
Created by lilKriT.

# Guide

## Steps

- Install prisma `pnpm install -D prisma`
- Install VSCode plugin
- Initialize `pnpm dlx prisma init --datasource-provider sqlite` (datasource is optional, postgres is default.)

  If you start on dev:

- Create a model
- Migrate it to DB - `pnpm dlx prisma migrate dev --name init`

If you starte with the DB:

- Pull the DB `pnpm dlx prisma db pull`

To modify existing schema: `pnpm dlx prisma migrate`

To interact with live db apparently you need to generate client?

Open Prisma Sutdio `pnpm dlx prisma studio`

**Prisma client is stored in node modules** What does it mean?
You need to regenerate the type definitions when building or deploying the application.

- During build: `"build": "prisma generate && next build"`

## Seeding

- add ts-none `pnpm install -D ts-node`
- create `prisma/seed.ts` and fill it out
- add a prisma section in package.json
- run `pnpm prisma db seed`
