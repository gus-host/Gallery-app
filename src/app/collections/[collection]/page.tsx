// src/app/collections/[collection]/page.tsx
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";
import CopyLinkButton from "@/components/CopyLinkButton";

export type ParamsView = { collection: string };

export default async function Page(
  { params }: { params: Promise<ParamsView> } // params is a Promise
) {
  const { collection } = await params;

  // Fetch the collection by its slug or id
  const col = await prisma.collection.findFirst({
    where: { OR: [{ id: collection }, { slug: collection }] },
    include: { favorites: true },
  });

  if (!col) notFound();

  return (
    <div className="p-6 my-[60px] max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{col.name}</h1>
        {/* CopyLinkButton is a client component */}
        <CopyLinkButton slug={col.slug} />
      </header>

      {col.favorites.length === 0 ? (
        <p className="text-gray-500">No images in this collection.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {col.favorites.map((fav) => (
            <div
              key={fav.id}
              className="relative overflow-hidden rounded-lg border"
            >
              <Image
                src={fav.imageUrl}
                alt={fav.description || "Image"}
                width={400}
                height={300}
                className="object-cover w-full h-48"
              />
              {fav.description && (
                <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2">
                  {fav.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
