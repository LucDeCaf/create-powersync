# Vite + PowerSync + Supabase

## Setup

- Replace `src/lib/AppSchema.ts` with your own `AppSchema.ts` (you can generate this file from the [PowerSync Dashboard](https://powersync.journeyapps.com).)
- Rename `.env.example` to `.env` and configure your `POWERSYNC_URL`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY`.

## Usage

Install project dependencies:
```sh
pnpm install
```

Run the project:
```sh
pnpm dev
```

## Inclusions

This template comes bundled with the following core dependencies:

- [ViteJS](https://vite.dev/): Bundling
- [Supabase](https://supabase.com/): Database and authentication
- [PowerSync](https://www.powersync.com/): Local-first sync engine

Additionally, the project also includes some additional dev dependencies:

- [TailwindCSS](https://tailwindcss.com/): Styling
- [Prettier](https://prettier.io/): Formatting
