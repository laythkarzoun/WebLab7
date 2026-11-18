# Assignment 7 — Multi-page React Mini Shop

A small online shop built with Vite, React Router, Context/useReducer, Zustand, the Fetch API, and two custom hooks. No backend or real checkout.

## Setup

1. Run `npm install`.
2. Copy `.env.example` to `.env` and replace `student@example.com` with **your actual university email**.
3. Run `npm run dev` and open the URL printed by Vite.
4. To verify a production build, run `npm run build`.

**Demo login:** your university email (from `.env`) and password `demo123456`. The login only lasts for the current React session; the cart and theme persist across reloads.

## File organization

- `src/api/`: browser Fetch API requests and a simulated delayed login.
- `src/hooks/`: reusable `useFetch` and `useLocalStorage` hooks.
- `src/context/`: shared authentication context and reducer.
- `src/store/`: Zustand cart actions and localStorage subscription.
- `src/components/`: layout, navigation, product card, protected route.
- `src/pages/`: home, catalogue, product detail, cart, login and 404 pages.
- `src/App.jsx`: nested route definitions; `src/main.jsx`: app providers and router.
- `src/styles.css`: minimal light and dark themes.

## Reasoning questions

### 1. State choices
The signed-in user lives in `AuthContext` because several components need to know whether somebody is logged in. Cart items live in Zustand because the navbar, detail page, product cards, and cart all read or modify them frequently. Filter values live in URL query parameters so filtered links can be shared or refreshed. Products live in each page's `useFetch` state, while the theme uses `useLocalStorage` inside the shared layout so it survives reloads.

### 2. Context versus store
Authentication changes rarely, so Context and a reducer make the login/logout flow easy to follow. The cart changes much more often, and Zustand selectors let a component subscribe only to what it needs. Putting the cart into one large Context value would trigger more consumers to re-render when quantities change, while moving authentication to Zustand would add complexity without much benefit in this small app.

### 3. Custom hooks
`useFetch` shares the loading/error/data state pattern, request cancellation, and reducer logic between the list and detail screens. It deliberately does not share the fetched data or reducer state: each call creates its own state and AbortController. One page fetches a whole list and the other fetches a specific item.

### 4. Route parameters
`useParams()` returns the `id` as a string, even though product objects use numeric IDs. This matters when building the fetch URL in `ProductDetail`: the string is passed to `fetchProduct` and encoded safely into the request path. The cart uses the numeric `id` returned by the API for comparisons.

### 5. Protected routes
`ProtectedRoute` is only a client-side redirect that improves user experience, not real security. Anyone can inspect or modify browser-side JavaScript, and the demo credentials are visible in the bundle. Real security would need an authenticated backend, securely managed sessions/tokens, and server-side permission checks for protected data.

### 6. Deep links
A plain static server might return HTTP 404 after a refresh on `/products/3`, because there is no physical file at that path. Vite's development server falls back to `index.html`, allowing `BrowserRouter` to read the URL and show the correct React page. A production static host needs a similar SPA fallback/rewrite rule.

## Self-study notes

- **Query strings:** `useSearchParams()` provides a `URLSearchParams` instance; I clone the previous parameters before changing just `q` or `category`, so the other filter is preserved.
- **Safe cart loading:** `JSON.parse` is wrapped in `try/catch`; absent, malformed, or invalid saved items become an empty array. A Zustand `subscribe` listener, not a React effect, writes the updated items to localStorage.
- **Theming:** `useLocalStorage` persists `light` or `dark`. The layout applies a CSS class, and CSS custom properties change background, surface, text, and border colors.
- **Request cleanup:** the `useFetch` effect creates an `AbortController` and aborts it in cleanup so outdated responses do not overwrite new data.

Official reference documentation: [React Router](https://reactrouter.com/start/declarative/url-values), [React Hooks](https://react.dev/reference/react), [Zustand](https://zustand.docs.pmnd.rs/), [MDN AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController), [MDN URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams).

## Challenges and decisions

The main challenge was keeping shareable filters in the URL rather than duplicating them in local state. Another challenge was making product detail requests cancel safely if the route parameter changes quickly. I also kept the cart persistence outside React as requested, while leaving derived values such as totals and item counts out of the store.

## Git / submission

The assignment requires **at least 14 genuine, meaningful commits showing progress over time**. Do not submit the project as a single uploaded zip on GitHub, and do not falsify commit timestamps. Commit real changes as you build, review, test, and improve the application. Push the Git repository to GitHub, then submit its repository URL. Keep `node_modules` and `.env` out of Git.
