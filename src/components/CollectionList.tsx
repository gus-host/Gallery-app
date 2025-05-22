"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getCollections, deleteCollection } from "@/lib/collectionService";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

type Collection = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

export default function CollectionsList() {
  const [collections, setCollections] = useState<Collection[] | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  // Fetch collections
  const load = async () => {
    setLoading(true);
    try {
      if (session?.user?.id) {
        const data = await getCollections(session.user.id);
        setCollections(data);
      } else {
        setCollections([]);
      }
    } catch (error) {
      console.error("Error loading collections:", error);
      setCollections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [session?.user?.id]);

  const handleCreate = () => {
    router.push("/collections/new");
  };

  const handleEdit = (id: string) => {
    router.push(`/collections/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;
    try {
      await deleteCollection(id, session?.user.id as string);
      // reload list
      await load();
    } catch (error: unknown) {
      console.error("Delete failed:", error);
      alert((error as { message: string }).message);
    }
  };

  if (loading) {
    return (
      <p className="p-4 text-gray-500 text-center mt-[50px]">
        Loading collections…
      </p>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow mx-auto max-w-[1000px] my-[100px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Collections</h2>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark text-[14px] cursor-pointer"
        >
          + Create Collection
        </button>
      </div>

      {collections && collections.length > 0 ? (
        <ul className="space-y-3">
          {collections.map((col) => (
            <li
              key={col.id}
              className="flex items-center justify-between p-3 border rounded hover:shadow"
            >
              {/* Clicking name navigates to detail */}
              <div
                className="flex-1 cursor-pointer"
                onClick={() => router.push(`/collections/${col.id}`)}
              >
                <p className="font-medium">{col.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(col.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(col.id)}
                  title="Edit collection"
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <PencilIcon className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDelete(col.id)}
                  title="Delete collection"
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No collections yet.</p>
      )}
    </div>
  );
}
