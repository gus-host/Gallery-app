import { ImageType } from "@/types/ImageTypes";
import GalleryItem from "./GalleryItem";

export default function GalleryGrid({ images }: { images: ImageType[] }) {
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-6 p-6 space-y-4">
      {images.map((img) => (
        <GalleryItem key={img.imageId} img={img} />
      ))}
    </div>
  );
}
