import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import "./globals.css";
import Header from "@/components/Header";
import FavoritesLoader from "@/components/FavoritesLoader";

export const metadata: Metadata = {
  title: "Gallery App",
  description: "Magic Photo Library ✨",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper>
          <FavoritesLoader />
          <Header />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
