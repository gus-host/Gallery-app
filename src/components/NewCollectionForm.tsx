"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type Favorite = {
  id: string; // <-- use this id
  imageId: string;
  imageUrl: string;
  description: string;
};

export default function NewCollectionForm() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [items, setItems] = useState<Favorite[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1) load the user’s favorites
  useEffect(() => {
    if (status !== "authenticated") return;
    fetch(`/api/favorites?userId=${session?.user.id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: Favorite[]) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [status, session?.user.id]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const slugify = (str: string) =>
    str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || selectedIds.size === 0) {
      setError("Please enter a name and select at least one image.");
      return;
    }
    if (status !== "authenticated" || !session.user?.id) {
      setError("You must be signed in.");
      return;
    }

    setSubmitting(true);

    const payload = {
      userId: session.user.id,
      name: name.trim(),
      slug: slugify(name),
      favoriteIds: Array.from(selectedIds),
    };

    const res = await fetch("/api/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSubmitting(false);

    if (res.ok) {
      router.push("/collections");
    } else {
      const json = await res.json();
      console.log(json);
      setError(json.error || "Failed to create collection");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center p-6">
        <ArrowPathIcon className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }
  if (status !== "authenticated") {
    return (
      <p className="p-6 text-center">Please sign in to create a collection.</p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-6 rounded max-w-xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">New Collection</h2>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <label className="block mb-2 font-medium">Collection Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
        placeholder="e.g. Summer Trip 2025"
        required
      />

      <label className="block mb-2 font-medium">Select Images</label>
      {loading ? (
        <p>Loading images…</p>
      ) : items.length === 0 ? (
        <p className="text-gray-500 mb-4">No saved images found.</p>
      ) : (
        <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto mb-4">
          {items.map((item) => (
            <div
              key={item.id} // <-- use favorite.id
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
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {submitting ? "Creating…" : "Create Collection"}
      </button>
    </form>
  );
}
