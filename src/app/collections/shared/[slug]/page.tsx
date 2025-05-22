// src/app/collections/share/[slug]/page.tsx
import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

export type ShareParams = { slug: string };

export default async function SharePage({
  params,
}: {
  params: Promise<ShareParams>;
}) {
  const { slug } = await params;
  const collection = await prisma.collection.findUnique({
    where: { slug },
    include: { favorites: true },
  });

  if (!collection) notFound();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">{collection.name}</h1>
        <p className="text-sm text-gray-500">
          Shared collection •{" "}
          {new Date(collection.createdAt).toLocaleDateString()}
        </p>
      </header>

      {collection.favorites.length === 0 ? (
        <p className="text-gray-500">No images in this shared collection.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {collection.favorites.map((fav) => (
            <div
              key={fav.id}
              className="relative overflow-hidden rounded-lg border"
            >
              <Image
                src={fav.imageUrl}
                alt={fav.description || "Shared image"}
                width={400}
                height={300}
                className="object-cover w-full h-48"
              />
              {fav.description && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-sm text-white">
                  {fav.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
