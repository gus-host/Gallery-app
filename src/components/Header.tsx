"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import Logo from "./icons/Logo";

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className="h-16 bg-white shadow-md flex justify-between items-center px-6 md:px-10">
      <Link href="/" className="flex items-center">
        <Logo />
      </Link>

      <nav>
        <ul className="flex gap-6 items-center">
          <li className="flex items-center">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                pathname === "/"
                  ? "cursor-pointer text-primary font-semibold hover:text-primary-dark transition"
                  : "text-gray-900 hover:text-gray-700"
              }`}
            >
              Home
            </Link>
          </li>

          {session && (
            <>
              <li className="flex items-center">
                <Link
                  href="/favorites"
                  className={`cursor-pointer transition-colors ${
                    pathname === "/favorites"
                      ? "text-primary hover:text-primary-dark font-semibold transition"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Favorites
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  href="/collections"
                  className={`cursor-pointer transition-colors ${
                    pathname === "/collections"
                      ? "text-primary hover:text-primary-dark font-semibold transition"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Collection
                </Link>
              </li>
              <li className="flex items-center">
                <LogoutButton />
              </li>
            </>
          )}

          {!session && (
            <li className="flex items-center">
              <Link
                href="/login"
                className="cursor-pointer bg-primary text-white px-3 py-2 sm:px-5 rounded-md hover:bg-primary-dark transition text-sm sm:text-base"
              >
                Log in
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
