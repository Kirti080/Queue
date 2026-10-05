# Queue reviewer notes

## Architecture
QueueFlow is a Vite React single-page application for customer/provider bookings and live queues. Routing is centralized in `src/App.jsx`, with public, authentication, customer, and provider page groups rendered through `PublicLayout` or `DashboardLayout`. The current UI is demo-oriented: mock data and role-based browser state drive the application, while Supabase is provisioned separately in `src/lib/supabase.js`.

## Conventions
- Use React Router routes from `src/App.jsx`; customer paths are under `/customer/*`, provider paths under `/provider/*`, and public provider discovery under `/providers/*`.
- Keep shared presentation primitives in `src/components/common.jsx` (`Button`, `Badge`, `StatusBadge`, `PageHeader`, cards, dialogs) and layouts/navigation in `src/components/layouts.jsx`.
- Reuse centralized mock entities from `src/data/mockData.js` rather than duplicating provider, service, booking, queue, or availability records. Relationships use IDs such as `booking.providerId` and `booking.serviceId`.
- Status values are snake_case and should be mapped through `statusTone` in `src/components/common.jsx`; `StatusBadge` also renders them by replacing underscores with spaces.
- Currency is formatted through `money()` in `src/components/common.jsx`, using INR with zero decimal places.
- Import aliases are configured as `@/*` → `src/*` in `tsconfig.json` and `vite.config.js`; `src/components/ui/button.tsx` and `src/lib/utils.ts` use this alias.
- Existing feature pages are grouped into aggregate modules (`src/pages/PublicPages`, `AuthPages`, `CustomerPages`, and `ProviderPages`) rather than one route component per directory.
- The application uses both JSX and TypeScript UI utilities. Existing JSX code generally uses relative imports and the custom CSS class primitives (`btn`, `badge`, `metric`, etc.), while the generated UI button uses Tailwind classes and `cn()`.

## Intentional non-standard choices
- Authentication and authorization are explicitly mocked. `src/context/MockAuthContext.jsx` stores only the selected role in `localStorage`, and `MockGuard` in `src/App.jsx` is a UI routing guard, not security.
- Demo authentication accepts fabricated credentials and redirects based on the selected role (`src/pages/AuthPages.jsx`). Signup, Google login, password reset, and account creation are visual/demo flows.
- Application records are static fixtures in `src/data/mockData.js`; UI actions should not be assumed to persist backend state.
- `src/lib/supabase.js` validates `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`, but the sampled application still uses mock context/data.

## Watch out for
- Do not treat `MockGuard` or the role selector as real access control; never add security-sensitive behavior relying on them (`src/App.jsx`, `src/components/layouts.jsx`).
- Preserve the route/role redirect behavior when adding dashboard routes. A customer visiting provider routes, or vice versa, is redirected to that role’s dashboard.
- Avoid breaking fixture relationships: services must reference valid provider IDs, and bookings must reference valid provider/service IDs (`src/data/mockData.js`, `src/components/common.jsx`).
- Check which button primitive is intended before changing imports: `src/components/common.jsx` exports a custom CSS-based `Button`, while `src/components/ui/button.tsx` wraps `@base-ui/react/button` with CVA/Tailwind styling.
- New imports of `src/lib/supabase.js` require the two Vite environment variables; otherwise module evaluation intentionally throws an error.