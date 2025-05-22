export async function getUnsplashImages(query: string, page:number, perPage:number) {
  try {
    const response = await fetch(`/api/unsplash?query=${query}&page=${page}&per_page=${perPage}`);
    if (!response.ok) throw new Error("Failed to fetch images");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return { results: [] };
  }
}
