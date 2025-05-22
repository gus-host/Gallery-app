"use client";

import { useEffect } from "react";
import { useImageStore } from "@/store/useImageStore";
import { useSession } from "next-auth/react";

export default function FavoritesLoader() {
  const { data: session, status } = useSession();
  const loadFavorites = useImageStore((state) => state.loadFavorites);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (session?.user?.id) {
        try {
          await loadFavorites(session.user.id);
        } catch (error) {
          console.error("Error loading favorites:", error);
        }
      }
    };

    if (status === "authenticated") {
      fetchFavorites();
    }
  }, [session, status, loadFavorites]);

  return null;
}
