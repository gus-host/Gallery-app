import Image from "next/image";
import { useImageStore } from "@/store/useImageStore";
import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { ImageType } from "@/types/ImageTypes";
import { useSession } from "next-auth/react";

export default function GalleryItem({ img }: { img: ImageType}) {
  const favorites = useImageStore((state) => state.favorites);
  const toggleFavorite = useImageStore((state) => state.toggleFavorite);

  const { data: session } = useSession();
  const isFavorite = favorites.some((fav) => fav.imageId === img.imageId);


  const handleToggleFavorite = async () => {
    if (session?.user?.id) {
      await toggleFavorite(img, session.user.id);
    } else {
      console.error("User not authenticated");
    }
  };


  return (
    <div className="mb-6 relative w-full break-inside-avoid group">
      <Image
        src={img.imageUrl}
        alt={img.description || "Image"}
        width={300}
        height={200}
        className="rounded-lg shadow-md hover:scale-105 transition-transform w-full h-auto"
      />
      {session &&
            <button
            onClick={handleToggleFavorite}
            className="absolute top-2 right-2 text-white bg-black/50 p-2 rounded-full opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity"
          >
            {isFavorite ? (
              <HeartIcon className="w-6 h-6 text-red-500" />
            ) : (
              <HeartOutline className="w-6 h-6 text-white" />
            )}
          </button>
      
      }   
    </div>
  );
}
