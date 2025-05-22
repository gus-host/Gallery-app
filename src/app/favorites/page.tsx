"use client";

import { useImageStore } from "@/store/useImageStore";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";

export default function FavoritesPage() {
  const favorites = useImageStore((state) => state.favorites);
  const toggleFavorite = useImageStore((state) => state.toggleFavorite);
  const { data: session } = useSession();


  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold text-center my-6 text-gray-700">Your Favorites ❤️</h1>
      <div className="w-full">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
            {favorites.map((img) => (
              <div key={img.imageId} className="relative group">
                <Image
                  src={img.imageUrl}
                  alt={img.description || "Favorite image"}
                  width={500}
                  height={350}
                  className="rounded-lg shadow-md w-full h-auto object-cover"
                />
                <button
                  onClick={() => {
                    if (session?.user?.id) {
                      toggleFavorite(img, session.user.id);
                    } else {
                      console.error("User ID is not available");
                    }
                  }}
                  className="absolute top-2 right-2 text-white bg-black/50 p-1 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
                >
                  <HeartIcon className="w-6 h-6 text-red-500" />
                </button>
              </div>
            ))}
        
          </div>
        ) : (
          <p className="text-center text-gray-500 text-xl">No favorites yet! ❤️</p>
        )}
      </div>
    </div>
  );
}
