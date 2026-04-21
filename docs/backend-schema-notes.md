# Backend Schema Notes

## What should go into the database now

After reviewing the current codebase, the first database boundary should cover:

- `contact-us` form submissions
- `support-a-cause` donation lead submissions
- `join-us` interest registrations
- the contact page's public office/contact details if you want them editable
- the sponsor/support campaigns if you want those slides editable from data instead of code

## What should stay in code for now

Most activity pages are static content-heavy landing pages with hardcoded arrays, icons, and layout-specific copy. Moving all of that into Postgres immediately would add complexity without improving operations.

Keep these static for phase 1:

- activity page copy
- home page sections
- visual-only hero slides outside `support-a-cause`
- most UI text that is not operationally edited

## Recommended first release

Use the database only for records your team needs to track or update:

1. `ContactSubmission`
2. `DonationIntent`
3. `EngagementInquiry`

This immediately makes the forms useful in production on Vercel.

## Minimal editable content layer

If you want the current `contact-us` and `support-a-cause` pages to read from the database instead of hardcoded arrays, these are the only content tables worth adding right now:

- `Campaign`
- `ContactChannel`
- `OfficeLocation`
- `SocialLink`

That keeps the content model small and directly aligned with the pages that already exist.

## Why this schema fits the current codebase

- `support-a-cause` already behaves like a campaign selector, so a `Campaign` table is a natural fit.
- `contact-us` has both static office details and a submission form, so it needs both content tables and a submission table.
- `join-us` is another lead capture form and should not be mixed into contact submissions.
- footer contact details and social links are repeated content and benefit from being centrally managed.

## Suggested rollout order

1. Wire `ContactSubmission`
2. Wire `DonationIntent`
3. Wire `EngagementInquiry`
4. Move contact page details into `ContactChannel`, `OfficeLocation`, and `SocialLink`
5. Move sponsor page campaigns into `Campaign`

## Important implementation note for Vercel

Use this database from server-side route handlers only. Do not connect directly to Postgres from the browser. The public Supabase URL and publishable key are fine to expose, but the Postgres connection string must stay server-only.
