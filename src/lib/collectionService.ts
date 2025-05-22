export async function getCollections(userId: string) {
  try {
    const response = await fetch(`/api/collections?userId=${userId}`);
    if (!response.ok) throw new Error("Failed to get favorite images");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
}

export async function getCollection(collectionId: string) {
  const res = await fetch(`/api/collections/${collectionId}`);
  if (!res.ok) throw new Error("Failed to fetch collection");
  return res.json();
}

export async function deleteCollection(collectionId: string, userId: string) {
  const res = await fetch(
    `/api/collections?userId=${userId}&collectionId=${collectionId}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error || "Failed to delete collection");
  }
  return true;
}

export async function updateCollection(
  userId: string,
  collectionId: string,
  payload: { name?: string; favoriteIds?: string[] }
) {
  const res = await fetch(
    `/api/collections?userId=${userId}&collectionId=${collectionId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) {
    const json = await res.json();
    throw new Error(json.error || "Failed to update collection");
  }
  return res.json();
}
