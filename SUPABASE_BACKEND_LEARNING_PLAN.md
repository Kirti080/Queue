# QueueFlow Supabase Backend Learning Plan

This plan is intentionally not implemented. Build and test each stage in a separate Supabase development project before using production data.

## 1. Tables and columns

All IDs use `uuid primary key default gen_random_uuid()`. Every mutable table should have `created_at timestamptz not null default now()` and `updated_at timestamptz not null default now()` with a shared update trigger.

| Table | Purpose | Important columns |
|---|---|---|
| `profiles` | App identity attached to Auth | `id uuid primary key references auth.users on delete cascade`, `role text not null check (role in ('customer','provider'))`, `full_name text not null`, `phone text`, `avatar_path text`, timestamps |
| `providers` | Public business profile | `id uuid`, `owner_id uuid not null references profiles(id)`, `business_name text not null`, `description text`, `category text not null`, address fields, `phone text`, `email text`, `profile_image_path text`, `cover_image_path text`, `is_published boolean default false`, `rating_average numeric(2,1) default 0`, `review_count integer default 0` |
| `services` | Bookable offerings | `provider_id uuid references providers on delete cascade`, `name text not null`, `description text`, `duration_minutes integer check (> 0)`, `price_paise integer check (>= 0)`, `category text`, `is_active boolean default true` |
| `availability_rules` | Recurring weekly hours | `provider_id uuid`, `weekday smallint check (0–6)`, `start_time time`, `end_time time`, `is_enabled boolean default true`, constraint `end_time > start_time`, unique `(provider_id, weekday)` |
| `availability_breaks` | Breaks inside working hours | `availability_rule_id uuid references availability_rules on delete cascade`, `start_time time`, `end_time time`, constraint `end_time > start_time` |
| `blocked_dates` | Holidays or one-off closures | `provider_id uuid`, `blocked_date date`, `reason text`, unique `(provider_id, blocked_date)` |
| `bookings` | Appointment lifecycle | `customer_id uuid references profiles`, `provider_id uuid references providers`, `service_id uuid references services`, `starts_at timestamptz not null`, `ends_at timestamptz not null`, `status text` constrained to the nine UI statuses, `customer_notes text`, `price_paise integer`, `duration_minutes integer`, `cancel_reason text`, `version integer default 1` |
| `queue_entries` | A booking's position on a service day | `booking_id uuid unique references bookings on delete cascade`, `provider_id uuid`, `service_date date`, `queue_number integer`, `status text check (status in ('waiting','called','in_service','completed','skipped','left'))`, `checked_in_at`, `called_at`, `started_at`, `completed_at` as nullable `timestamptz`, unique `(provider_id, service_date, queue_number)` |
| `reviews` | Customer feedback | `booking_id uuid unique references bookings`, `customer_id uuid`, `provider_id uuid`, `rating smallint check (rating between 1 and 5)`, `comment text`, `is_visible boolean default true` |
| `notifications` | In-app delivery log | `profile_id uuid`, `type text`, `title text`, `body text`, `data jsonb default '{}'`, `read_at timestamptz` |
| `notification_preferences` | Per-user choices | `profile_id uuid primary key`, boolean columns for reminders, queue updates, recommendations, cancellations and daily summary |

Store money as integer paise, not floating point. Copy service price and duration into each booking so history remains correct after a service changes.

## 2. Relationships

```text
auth.users 1──1 profiles
profiles(customer) 1──* bookings *──1 providers *──1 profiles(owner)
providers 1──* services
providers 1──* availability_rules 1──* availability_breaks
providers 1──* blocked_dates
bookings 1──0..1 queue_entries
bookings 1──0..1 reviews
profiles 1──* notifications
```

## 3. Authentication, roles, and profile creation

1. Sign up with Supabase Auth and put only the requested role in trusted signup metadata.
2. An `auth.users` trigger inserts the matching `profiles` row. Restrict roles to customer/provider and default to customer.
3. A provider completes a separate `providers` row after signup. Do not equate the provider business ID with the Auth user ID.
4. Load the profile after session restoration and replace `MockAuthContext` with a real `AuthContext`.
5. Frontend guards remain navigation conveniences; RLS is the security boundary. Privileged role changes should require a server-controlled process.

## 4. RLS policy outline

Enable RLS on every public-schema table.

- `profiles`: authenticated users select/update their own row; providers may select limited customer data only through bookings they own. Avoid exposing profiles broadly.
- `providers`, active `services`, availability and blocked dates: public SELECT only for published providers. Owners may INSERT/UPDATE/DELETE rows where `owner_id = auth.uid()` or the parent provider belongs to them.
- `bookings`: customers SELECT/INSERT their own bookings and UPDATE only allowed customer transitions; provider owners SELECT and perform provider transitions for bookings belonging to their provider. No direct DELETE; retain history and use cancellation status.
- `queue_entries`: the booking customer can SELECT their own entry. Provider owners can SELECT/INSERT/UPDATE their queue. Do not expose other customers' names/IDs through public queue reads.
- `reviews`: public SELECT visible reviews; a customer INSERTs only for their own completed booking; customer updates/deletes their own review; provider cannot edit customer content.
- `notifications` and preferences: users can only access rows where `profile_id = auth.uid()`.

Complex status transitions, queue assignment, and availability checks should be `security definer` database functions with fixed `search_path`, explicit authorization checks, and minimal grants—not permissive client updates.

## 5. Preventing double-booking

Use PostgreSQL range exclusion, which is safe under concurrency:

1. Enable `btree_gist`.
2. Add a generated `tstzrange(starts_at, ends_at, '[)')` booking range.
3. Add an exclusion constraint on `(provider_id WITH =, booking_range WITH &&)` for active statuses (`pending`, `confirmed`, `checked_in`, `in_queue`, `in_progress`). If providers have multiple simultaneous staff/resources, constrain by a future `resource_id` instead.
4. Create bookings through one transaction/RPC that locks/checks availability, snapshots price/duration, inserts, and returns a friendly conflict error. Client-side slot filtering is never sufficient.

## 6. Queue model and Realtime

Assign queue numbers inside a transaction after check-in. Lock a provider/day counter row (or use an advisory transaction lock), increment it, and insert the unique queue entry. Display numbers with a UI prefix such as `QF104`; store the numeric sequence. Estimate wait from people ahead and the provider's rolling average service duration. Status changes should record timestamps for audit and better estimates.

Subscribe with Supabase Realtime to:

- the customer's own queue entry;
- provider queue entries for the active service date;
- booking status updates relevant to the signed-in customer/provider;
- new user notifications.

Do not subscribe to static provider catalogs or historical data. Filter channels narrowly and re-fetch authoritative state after reconnect.

## 7. Frontend replacement map

- `src/data/mockData.js`: becomes seed/test fixtures only, never production state.
- `src/services/mockApi.js`: replace method-by-method with modules such as `providerService.js`, `bookingService.js`, `queueService.js`, and `profileService.js` using the Supabase client.
- `src/context/MockAuthContext.jsx`: replace with session/profile loading and Auth event handling.
- Local mutations/timers in the booking, queue, service, availability, and settings pages: replace with service calls, cache refreshes, and scoped Realtime subscriptions.
- Keep presentational components and status formatting unchanged; pass them normalized service-layer data.

## 8. Safe beginner implementation order

1. Create a development Supabase project; configure local `.env.local` and keep it out of Git.
2. Add enums/check constraints, tables, foreign keys, timestamps, and indexes.
3. Add the profile trigger and test customer/provider signup.
4. Enable RLS immediately; test every policy as anonymous, customer A, customer B, and provider.
5. Implement public provider/service reads, then provider profile/service ownership writes.
6. Implement availability reads and the transactional booking RPC with the exclusion constraint.
7. Connect customer and provider booking pages; test forbidden cross-account access.
8. Add transactional queue functions and status-transition validation.
9. Add reviews, notification preferences, and Storage policies for avatar/cover paths.
10. Add narrowly filtered Realtime subscriptions and reconnection behavior.
11. Add automated database tests for double booking, cross-tenant access, invalid transitions, and concurrent queue check-ins.
12. Only after all mock calls are replaced, remove the mock role switcher and mock data from production builds.
