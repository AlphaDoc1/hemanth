# Running the portfolio

Run `npm ci` and `npm run dev` from this repository.

Supabase is optional. Without a URL and public key, every public section renders
with labeled preview content from `src/data/portfolioPreview.ts`. Preview skills
have no invented proficiency scores. Admin sign-in requires Supabase, while the
contact form can open a draft in the visitor's email application.

To load your saved portfolio, copy `.env.example` to `.env.local`, fill in
`VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`, and restart Vite. Use your
public/anon key, never a service-role key. `VITE_SUPABASE_PROJECT_ID` is optional
metadata. Environment files ending in `.local` are ignored by Git.

Saved data replaces preview content once the requests succeed. Connection errors
keep the frontend visible and offer a retry; stalled requests time out after eight
seconds. A successfully loaded empty project list displays an empty state.

Run `npm run build` for a production build. Vite embeds its environment settings at
build time, so rebuild after changing settings for deployment.
