# 📸 Gallery — A Modern Photo Gallery Built with Next.js

Welcome to **Gallery**, a responsive and elegant photo gallery application powered by **Next.js** and the **Unsplash API**.  
This project showcases modern frontend practices, server/client-side rendering, authentication, and scalable architecture — all wrapped in a polished UI.

> 🚧 **Status**: Work in Progress (WIP)

---

## 🌐 Live Demo

🔗 [View Live on Vercel](https://gallery-next-ecru.vercel.app)

---

## 🚀 Tech Stack

| Technology       | Purpose                           |
|------------------|-----------------------------------|
| **Next.js**       | SSR, CSR, SSG — full flexibility  |
| **React**         | UI components and logic           |
| **TailwindCSS**   | Modern utility-first styling      |
| **Zustand**       | Lightweight global state management |
| **Next-Auth**     | Secure user authentication (Google OAuth) |
| **Prisma**        | Type-safe ORM for PostgreSQL      |
| **Neon**          | Cloud-native PostgreSQL database  |
| **Heroicons**     | Iconography                       |
| **Vitest + RTL**  | Unit testing setup                |
| **Vercel**        | Seamless deployment and CI/CD     |

---

## ✨ Features

### ✅ Completed
- Image search powered by **Unsplash API**
- Sort by **likes** and **recent**
- Image pagination
- Save favorites
- Google Authentication with **Next-Auth**
- Fully responsive design
- Beautiful, minimal UI with **TailwindCSS**
- Global state using **Zustand**

### 🛠 In Progress
- Unit testing with **Vitest** and **React Testing Library**

### 🔮 Coming Soon
- Image upload and management
- Advanced search & filters
- Tests e2e
---

## ⚙️ Getting Started

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/LizethPatino/gallery-next.git

# Enter project directory
cd gallery-next

# Install dependencies
npm install

# Run the development server
npm run dev

```

Visit **http://localhost:3000** in your browser


### 🔐 Environment Variables

---

Create a `.env.local` file at the root of the project with the following keys:

```bash

# Unsplash
UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# NextAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_auth_secret

# Database
DATABASE_URL=your_postgres_connection_string

```
