# Flipzon E-Com platform

Project live link:  https://flipzone-complatform.netlify.app/

React e-commerce application using FakeStore API.

Purpose: Demonstrates component architecture, API integration, search/filtering, cart & wishlist flows, routing, responsive UI, and basic persistence.


Features:

Product listing: Responsive grid of products fetched from FakeStore API.
Search & Filter: Centered search bar (case-insensitive) and category filtering.
Product detail page: Full product info (image, description, price, category, rating).
Cart: Add items, increment/decrement quantity, remove items, total price.
Wishlist: Add/remove items, “Move to Cart” action.
Header badges: Live counts (cart quantity, wishlist count).
Persistence: Cart and wishlist saved to localStorage.
Routing: Pages for Home, Product Detail, Cart, Wishlist (react-router).
Responsive UI: 4/3/2 columns (desktop/tablet/mobile) via CSS variables + media queries.
Accessibility: aria-labels, focus outlines, live region for quantity updates.
Animations: Card hover lift and button hover transitions.



How it works (data & flow):

Fetch: useEffect in App fetches products from https://fakestoreapi.com/products and stores them in state.
Search/filter: searchQuery state filters the products array before rendering.
Add to cart: handleAddToCart(product) adds product with quantity or increments existing quantity.
Wishlist: handleAddToWishlist(product) adds product; moveToCart(id) moves an item into the cart (merges quantities).
Persistence: cart and wishlist saved on change to localStorage and read on app load.
Navigation: Header buttons call navigate('/cart') or navigate('/wishlist'); product clicks navigate to /product/:id.
Totals and badges: Cart total uses sum(price * quantity); header badge shows total quantity (not distinct items).



Main files / components:

App.jsx — App shell, global state, handlers (cart/wishlist logic), routing.
main.jsx — React bootstrap and BrowserRouter.
App.css — All styles, responsive rules, CSS variable --cols for column count.
ProductList.jsx — Renders grid of ProductCard.
ProductCard.jsx — Single product UI (image/title/price, Add to Cart, Wishlist).
ProductDetail.jsx — Reads :id from URL, displays full product details.
Cart.jsx — Cart page (image, desc, qty controls, remove, total).
Wishlist.jsx — Wishlist page with Move to Cart and Remove actions.
index.html, {} package.json, README.md.



State management:

Local state only: useState in App.jsx holds products, searchQuery, cart, wishlist, selectedProduct (where used).
Side effects: useEffect for fetching and syncing localStorage.
Prop drilling: Handlers passed as props (add/remove/move/increment/decrement) — small app, no context/Redux are used.


Styling & responsiveness:

Grid columns: Controlled by :root { --cols: 4 } with media-query overrides (tablet/mobile).
Header: Logo left, centered search input, top-buttons (Cart/Wishlist) right.
Cards: hover transform for lift; stacked layout on small screens; touch-friendly buttons.
Breakpoints: CSS media queries at 900px and 600px for tablet and mobile adjustments.
Accessibility & UX details


Animations:
Card hover lift, button hover color transitions.


Further plans to add more features to the exiating project:

Persist more state: Sync to backend or add user auth to store carts server-side.
Performance: Memoize lists or use virtualization for large catalogs.
State sharing: Move cart/wishlist to Context or Redux if app grows.
Polish UX: Add toasts, animated transitions, debounce search input, add pagination/infinite scroll.
Testing: Add unit tests for handlers (add/remove/move) and integration tests for main flows.
