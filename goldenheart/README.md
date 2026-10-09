# Goldenheart College website (Nuxt 3 + Tailwind)

## Run
    npm install
    npm run dev        # http://localhost:3000
    npm run build

## Where content lives
All text, contacts and placeholder data are in `data/site.ts`. Anything with
`placeholder: true` or a `// TODO` is sample content to confirm with the school.
`supabase/schema.sql` holds the database tables for the admin phase.

## Env (for Supabase, next phase)
SUPABASE_URL, SUPABASE_ANON_KEY
