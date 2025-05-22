"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getCollections } from "@/lib/collectionService";

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
  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);

      if (session?.user?.id) {
        try {
          const data = await getCollections(session.user.id);
          setCollections(data);
          console.log(data);
        } catch (error) {
          console.log(error);
          setCollections([]);
          console.error("Error loading favorites:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCollections();
  }, [session?.user?.id]);

  const handleCreate = () => {
    // navigate to your collection-creation page
    router.push("/collections/new");
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
              className="flex items-center justify-between p-3 border rounded hover:shadow cursor-pointer"
              onClick={() => router.push(`/collections/${col.id}`)}
            >
              <div>
                <p className="font-medium">{col.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(col.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className="text-blue-500 text-sm">View →</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No collections yet.</p>
      )}
    </div>
  );
}
