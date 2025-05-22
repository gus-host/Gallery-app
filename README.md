# Gallery App: Remember Your Precious Moments

<img src="public/favicon.png" alt="Gallery App Logo" width="200" height="200">

*(Hackathon Submission – Photos & Videos Gallery)*

## 📱 Overview

Gallery App is a full-stack Next.js application for discovering, saving, organizing, and sharing Unsplash images. Users sign in via NextAuth, mark favorites, group them into custom collections, and send friends a unique shareable link. Perfect for leisure browsing or preserving precious memories, Gallery App features a responsive Tailwind UI, Prisma-backed PostgreSQL storage, and server-side routes—ready to deploy on Vercel or any Node.js host.

---

## 🛠️ Tech Stack & Architecture

- **Framework & Language**  
  • Next.js 14 (App Router, React 18, React Server Components)  
  • TypeScript for safety and autocompletion  

- **Authentication**  
  • NextAuth.js with Google OAuth provider  
  • Session‐based, JWT under the hood  
  • Secures API routes via `getServerSession`

- **Database & ORM**  
  • PostgreSQL (Neon)  
  • Prisma ORM v6  
    - **Schema**:  
      ```prisma
      model User { id String @id @default(cuid()); …; favorites Favorite[]; collections Collection[] }
      model Favorite { id String @id @default(cuid()); userId String; imageId String; imageUrl String; description String; collections Collection[] }
      model Collection { id String @id @default(cuid()); userId String; name String; slug String @unique; favorites Favorite[] }
      ```
    - Many-to-many: `Collection.favorites` ↔ `Favorite.collections`

- **Styling & Components**  
  • Tailwind CSS (mobile-first, utility classes)  
  • Heroicons for SVG icons  
  • Next/Image for optimized image loading  

- **Hosting & Deployment**  
  • Vercel (serverless functions for API routes, SSR)  
  • Environment variables managed via Vercel dashboard or `.env.local`

---

## 🔗 APIs & Server Routes

- **Unsplash REST API**  
  - Endpoint: `https://api.unsplash.com/search/photos`  
  - Auth: `Authorization: Client-ID ${UNSPLASH_ACCESS_KEY}`  
  - Provides search results, image URLs, photographer credits  

- **Next.js API Routes** (`app/api/**`)  
  1. **`GET /api/favorites`**  
     - Returns the authenticated user’s saved `Favorite` records  
  2. **`POST /api/favorites`**  
     - Body: `{ imageId, imageUrl, description }`  
     - Creates a new `Favorite` tied to `session.user.id`  
  3. **`GET /api/collections`**  
     - Query: `?userId=` (or derive from session)  
     - Lists all `Collection` metadata plus `_count.favorites`  
  4. **`POST /api/collections`**  
     - Body: `{ userId, name, slug, favoriteIds[] }`  
     - Creates `Collection`, connects to existing `Favorite` IDs  
     - Validates slug uniqueness per user, returns 409 on conflict  
  5. **`PATCH /api/collections?collectionId=&userId=`**  
     - Body: `{ name?, favoriteIds? }`  
     - Updates name/slug and resets favorites relation  
  6. **`DELETE /api/collections?collectionId=&userId=`**  
     - Deletes a user’s collection safely  
  7. **`GET /api/collections/[collection]`**  
     - Path param: collection `id` **or** `slug`  
     - Returns full `Collection` including `favorites`  
  8. **Public page**: `GET /collections/share/[slug]`  
     - Server component that renders a shared collection without auth  

---

## ✨ Core Features

### 🔍 Search & Discover
- **Unsplash API Integration**  
  - Fetch high-resolution images, photographer name, links, and metadata  
  - Rate-limit handling and error fallback  
- **Live Autocomplete**  
  - Debounced input to minimize API calls  
  - Typeahead suggestions showing keywords or photographer names  
- **Advanced Filters**  
  - Orientation (landscape/portrait/square)  
  - Color palette filters (e.g. vibrant, muted, monochrome)  
  - Content safety “safe search” toggle  
- **Pagination & Infinite Scroll**  
  - Load more results as the user scrolls  
  - “Load more” button fallback on mobile  
- **Image Details Modal**  
  - Lightbox view with full-screen preview  
  - Download link, photographer credit, and EXIF data (where available)  

---

### 🔒 Secure Sign-In
- **NextAuth.js with Google OAuth**  
  - One-click Google sign-in, minimal setup  
  - Automatic session management with JWTs or database sessions  
- **Session Persistence**  
  - HTTP-only, Secure cookies to prevent XSS/CSRF  
  - “Remember me” option for long-lived sessions  
- **Role-based Access**  
  - Admin vs. User roles (future extensibility)  
  - Middleware guards on API routes and pages  
- **Account Linking**  
  - Support for multiple OAuth providers (e.g. GitHub, Facebook)  
  - Link/unlink in user settings  
- **User Profile Page**  
  - View and edit display name, avatar  
  - View usage stats: number of favorites and collections  

---

### ❤️ Favorites & Collections
- **Favorites**  
  - Click-to-favorite heart icon on each image tile  
  - “My Favorites” page listing all saved images  
  - Unfavorite via the same icon, optimistically updating UI  
- **Collections**  
  - **Create:** Name + unique slug generated automatically  
  - **Read:** List view showing collection name, thumbnail (first image), and count  
  - **Update:**  
    - Rename collection (updates slug if desired)  
    - Add/remove favorite images via checkboxes or drag-and-drop in a gallery grid  
  - **Delete:**  
    - Soft-delete option with “Trash” recovery (future)  
- **Many-to-Many Relationship**  
  - Prisma schema linking `Collection` ↔ `Favorite`  
  - Efficient joins and counts (`_count`) for fast listing  
- **Bulk Actions**  
  - Select multiple favorites to add/remove from a collection at once  
  - Export collection metadata as JSON or CSV  

---

### 🔗 Shareable Albums
- **Unique Slug URLs**  
  - SEO-friendly, human-readable slugs (e.g., `summer-trip-2025`)  
  - Validation to prevent collisions  
- **Public Viewing**  
  - `/collections/share/[slug]` serves a Server Component without auth  
  - Read-only gallery display with captions  
- **Expiration & Permissions**  
  - Optional expiration date on shared links (not completed)
  - Protected shares with secret token (future feature)  
- **Social Sharing Buttons**  
  - One-click share to Twitter, Facebook, WhatsApp (future feature)  
  - “Copy link” button with clipboard feedback  
- **Embed Support**  
  - Provide an `<iframe>` snippet so users can embed their collection in blogs  (future feature)

---

### 📱 Responsive Design
- **Mobile-First Layout**  
  - Single-column grid on small screens, expanding to multi-column on desktop  
  - Touch-friendly tap targets and swipe gestures  
- **Tailwind Utility Classes**  
  - Consistent spacing, typography, and color system  
  - Dark mode support via CSS media queries (future)  
- **Performance Optimizations**  
  - Lazy-load images with placeholder blur (`next/image`)  
  - Compress and serve modern formats (WebP/AVIF)  
- **Accessibility**  
  - ARIA labels on buttons and forms  
  - Keyboard-navigable galleries and modals  
  - Sufficient color contrast for text and controls  
- **Cross-Browser Testing**  
  - Verified on Chrome, Safari, Firefox, Edge, and mobile WebViews  


---

## 🚀 Getting Started

1. **Clone**  
   ```bash
   git clone https://github.com/YourUser/gallery-app.git
   cd gallery-app
   ```

2. **Install**  
   ```bash
   npm install
   ```

3. **Env Setup** (`.env.local`)  

   Use the following values, if some of the values don't work for any reason (e.g the google client Id) you can get the values from go to the secrete provider (e.g google cloud 
   console for client id and client secrete) to get the secrete. Ensure your also have a .env file.
   ```ini
   DATABASE_URL=postgresql://neondb_owner:npg_YcUxslGf21Ht@ep-round-paper-a5xq8tx5-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require&connect_timeout=300
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=040eb2d6f55afc4b868dcd8a01ac48693328a803fc191b04a0880aace65fc615
   GOOGLE_CLIENT_ID=1062997398040-fbnleg545744jc2ogb8ucaeifcoh4tpr.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=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
   UNSPLASH_ACCESS_KEY=EWk4jMRVe_xWQmYgbud47nqFsVLNJSlp3uo9orRzigA
   ```

5. **Prisma**  
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

6. **Run**  
   ```bash
   npm run dev
   # open http://localhost:3000
   ```

---

## 📺 Demo

![Demo GIF](assets/demo.gif)  
[Watch video walkthrough](https://your-video-link)

---

## 📋 Submission Requirements

- **README** (≤500 words) with demo  
- **Source Files** (buildable)  
- **License**: MIT  
- **Contact**: Discord / X handles below

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Connect With me

- **Discord:** `@your-discord-handle`  
- **X (Twitter):** `@your-twitter-handle`

---

*Built on [LizethPatino/gallery-next](https://github.com/LizethPatino/gallery-next) starter.*  
```
