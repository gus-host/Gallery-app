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
- **Advanced Filters**  
  - filter by most recent and most likes 
  - Orientation (landscape/portrait/square)  
- **Pagination**
  - Default search for "perros"
  - returning 15 images per page
  - Next page button to get mote search results
  - Previous page button to get previous images
 
  Watch video:

[![Demo Video](https://upww.screenrec.com/images/f_T3bqUFw6gONx8flzG1mkJBSXnWZ5A02E.png)](https://screenrec.com/share/y3C4DuS5eQ)  
*Click to play demo 
  
---

### 🔒 Secure Sign-In
- **NextAuth.js with Google OAuth**  
  - One-click Google sign-in, minimal setup  
  - Automatic session management with JWTs or database sessions  
- **Session Persistence**  
  - HTTP-only, Secure cookies to prevent XSS/CSRF  
  - “Remember me” option for long-lived sessions
- **Access to extra features**  
  - Ability to make favourites images
  - Favorite images are make by clicking the heart icon on the image
  - Heart icon will not be seen when user is not authenticated
  - Ability to access collections
  - Logout button to logout the account
 
[![Demo Video](https://upww.screenrec.com/images/f_eR3B16OMu0xPrg9dEHKimDbZFjXNfs2Y.png)](https://screenrec.com/share/kMPXH2r89l)  
*Click to play demo

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
  - Select multiple favorites to add from a collection at once
  

  [![Demo Video](https://upww.screenrec.com/images/f_9BYLbtiUAsjezrC0OpDukxwqQ14oWlKN.png)](https://screenrec.com/share/Y6MRzidmlQ)  
*Click to play demo
---

### 🔗 Shareable Albums
- **Unique Slug URLs**  
  - SEO-friendly, human-readable slugs (e.g., `summer-trip-2025`)  
  - Validation to prevent collisions  
- **Public Viewing**  
  - `/collections/share/[slug]` serves a Server Component without auth  
  - Read-only gallery display with captions   
- **Private view**  
  - Albums can also be viewed by logged in users

  [![Demo Video](https://upww.screenrec.com/images/f_il3h6b8E1WVGwFa0ozOvA7jIS4U5smPe.png)](https://screenrec.com/share/ZYzDNPyJQI)  
*Click to play demo
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

## ✨ Future Features (in development)
- **Live Autocomplete**  
  - Debounced input to minimize API calls  
  - Typeahead suggestions showing keywords or photographer names
- **Image Details Modal**  
  - Lightbox view with full-screen preview  
  - Download link, photographer credit, and EXIF data (where available)
- **Role-based Access**  
  - Admin vs. User roles (future extensibility)  
  - Middleware guards on API routes and pages
- **Account Linking**  
  - Support for multiple OAuth providers (e.g. GitHub, Facebook)  
  - Link/unlink in user settings  
- **User Profile Page**  
  - View and edit display name, avatar  
  - View usage stats: number of favorites and collections
- **Expiration & Permissions**  
  - Optional expiration date on shared links 
  - Protected shares with secret token  
- **Social Sharing Buttons**  
  - One-click share to Twitter, Facebook, WhatsApp   
  - “Copy link” button with clipboard feedback
 
    
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
<p><i>If any of the values don't work for any reason (e.g the google client Id) you can get the values from the secrete provider (e.g google cloud console for client id and client secrete). Ensure your also have a .env file (along with the .env.local file) with all the values below so that the command to generate the prisma client also works.</i></p>

3. **Env Setup** (`.env.local`)  
   ```bash
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

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Connect With me

- **Discord:** `@chrisdev_74671`  
- **X (Twitter):** `@ChrisDev879850`


