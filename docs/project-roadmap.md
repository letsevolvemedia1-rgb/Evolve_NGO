# Project Roadmap

## Phase 1
Stabilize what already exists.

1. Donation flow hardening
- store campaign label and campaign relation reliably
- add admin-safe test mode / test record flag
- add duplicate submission protection
- add better server logs for failed submissions
- send success email / acknowledgement after submit

2. Lead management basics
- make `ContactSubmission`, `EngagementInquiry`, and `DonationIntent` easy to review
- add simple admin table or Supabase dashboard views
- define statuses and follow-up workflow
- add timestamps, notes, and assigned-to fields if needed

3. Production reliability
- verify all envs in Vercel
- verify Prisma migrations are applied cleanly
- add error monitoring
- add uptime / form failure alerts

## Phase 2
Move repeated content out of code.

1. CMS-like database content
- `Campaign`
- `ContactChannel`
- `OfficeLocation`
- `SocialLink`

2. Replace hardcoded content in:
- `support-a-cause`
- `contact-us`
- footer contact block
- social links
- campaign cards on homepage

This gives non-developers control over operational content without overcomplicating the whole site.

## Phase 3
Make donation and inquiry flows actually useful operationally.

1. Donations
- payment gateway integration
- donation reference / receipt id
- 80G receipt generation
- donor confirmation email
- export donor CSV
- campaign-wise totals and reports

2. Join us
- separate inquiry types better
- resume upload for internships
- availability / city / skills fields
- internal review status flow

3. Contact us
- spam protection
- category field
- auto-routing based on topic

## Phase 4
Admin and internal tooling.

1. Admin dashboard
- login-protected internal panel
- submissions list
- filters by type, campaign, date, status
- detail pages for each record
- mark contacted / closed
- notes and tags
- export CSV

2. Content editor
- manage campaigns
- manage contact numbers and office addresses
- manage homepage campaign cards
- toggle active/inactive campaigns

## Phase 5
UX and trust improvements.

1. Donation page
- clearer campaign selector
- progress indicators per campaign
- recurring donation option
- preset + custom amount validation
- better success state

2. Trust-building
- audited impact numbers
- partner / CSR logos
- downloadable reports
- testimonials tied to programs
- real campaign updates

3. Form UX
- inline validation
- better mobile spacing
- loading and success states everywhere
- preserve data if submission fails

## Phase 6
SEO and performance.

1. SEO
- proper metadata per page
- Open Graph images
- structured data for NGO / organization
- sitemap and robots verification
- canonical URLs

2. Performance
- replace remaining raw `<img>` where needed
- optimize heavy assets
- remove duplicated image sets
- reduce layout shift on media sections

## Phase 7
Analytics and growth.

1. Tracking
- campaign-wise form conversion
- donation CTA click tracking
- source attribution
- UTM capture in submissions

2. Reporting
- top campaigns
- inquiry-to-contacted conversion
- donation funnel dropoff
- monthly growth snapshots

## Best Next 5 Tasks

1. Build a small admin dashboard for submissions.
2. Move campaign/contact/footer content into DB-backed tables.
3. Add email notifications for all form submissions.
4. Integrate payment collection for donations.
5. Add monitoring and proper error logging in production.

## Architecture Direction

Keep the site mostly static for marketing content, and make only these areas dynamic:

- forms
- campaigns
- contact details
- footer/social data
- admin/internal workflows

That keeps complexity under control and matches how the site is being used.
