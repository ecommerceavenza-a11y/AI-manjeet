# Avenza E-commerce

A premium, AI-first portfolio site for Shirish Rumba, built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, React Hook Form, Zod, and Nodemailer.

## Run locally

1. Copy `.env.example` to `.env.local` and add SMTP details if you want contact-form email delivery.
2. Run `npm install`.
3. Run `npm run dev`.

The contact endpoint validates every request. It returns a success response without SMTP configuration, making it usable for local demos; configure SMTP before production launch to send email notifications.

## Key routes

- `/` — homepage
- `/about` — profile and credentials
- `/services` and `/services/[slug]` — service catalogue and details
- `/blog` and `/blog/[slug]` — journal and article templates
- `/contact` — validated consultation form
- `/api/contact`, `/api/newsletter`, `/api/booking`, `/api/blog` — JSON APIs

## Deployment

Deploy to Vercel and add the SMTP variables from `.env.example`. Replace the production domain in `app/layout.tsx`, `app/robots.ts`, and `app/sitemap.ts` if using a domain other than `avenzaecommerce.com`.

# Flodesk Audience integration

The consultation form adds the visitor to Flodesk and emails the consultation details to the site owner. Configure `FLODESK_API_KEY` in the Vercel project’s Production environment before deploying this change. Create the key in Flodesk under Settings → API keys. Keep it server-side; never add it to a `NEXT_PUBLIC_` variable or commit it to Git.

Set `FLODESK_SEGMENT_ID` in Vercel only if you want these contacts assigned to a particular segment. Without it, Flodesk places them in All subscribers. New subscribers are created with double opt-in enabled, so they must confirm the Flodesk email before becoming active.
