"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { getCollection, updateCollection } from "@/lib/collectionService";

type Favorite = {
  id: string;
  imageId: string;
  imageUrl: string;
  description: string;
};

type Collection = {
  id: string;
  name: string;
  favoriteIds: string[]; // we’ll derive this from the fetched collection
};

export default function EditCollectionForm({
  collectionId,
}: {
  collectionId: string;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [items, setItems] = useState<Favorite[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load both the user’s favorites and the collection details
  useEffect(() => {
    if (status !== "authenticated") return;

    Promise.all([
      fetch(`/api/favorites?userId=${session.user.id}`).then((r) =>
        r.ok ? r.json() : []
      ),
      getCollection(collectionId),
    ])
      .then(([favList, col]: [Favorite[], Collection]) => {
        setItems(favList);
        setName(col.name);
        setSelectedIds(new Set(col.favoriteIds));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [status, collectionId, session?.user.id]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || selectedIds.size === 0) {
      setError("Name and at least one image are required.");
      return;
    }

    setSubmitting(true);
    try {
      await updateCollection(session?.user.id as string, collectionId, {
        name: name.trim(),
        favoriteIds: Array.from(selectedIds),
      });
      router.push("/collections");
    } catch (err: unknown) {
      console.error(err);
      setError((err as { message: string }).message);
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <ArrowPathIcon className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }
  if (status !== "authenticated") {
    return <p className="p-6">Please sign in to edit collections.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-6 rounded max-w-xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Collection</h2>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <label className="block mb-2 font-medium">Collection Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
        placeholder="Collection Name"
        required
      />

      <label className="block mb-2 font-medium">Select Images</label>
      {items.length === 0 ? (
        <p className="text-gray-500 mb-4">No saved images found.</p>
      ) : (
        <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto mb-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`relative border rounded overflow-hidden cursor-pointer ${
                selectedIds.has(item.id) ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => toggleSelect(item.id)}
            >
              <Image
                src={item.imageUrl}
                alt={item.description || "Image"}
                width={500}
                height={350}
                className="object-cover w-full h-48"
              />
              <input
                type="checkbox"
                checked={selectedIds.has(item.id)}
                readOnly
                className="absolute top-1 right-1 form-checkbox w-5 h-5 text-blue-600"
              />
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`w-full py-2 rounded text-white ${
          submitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {submitting ? "Updating…" : "Update Collection"}
      </button>
    </form>
  );
}
