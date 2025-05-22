export async function addFavorite(userId: string, imageId: string, imageUrl: string, description?: string) {
    const response = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, imageId, imageUrl, description }),
    });
  
    return response.json();
  }

  export async function getFavorites(userId: string) {
    try {
      const response = await fetch(`/api/favorites?userId=${userId}`);
      if (!response.ok) throw new Error("Failed to get favorite images");
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return [];
    }
  }

  export async function removeFavorite(userId:string, imageId:string) {
    try {
      const response = await fetch(`api/favorites?userId=${userId}&imageId=${imageId}`,{
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Error deleting image");
      }
      console.log("Image deleted successfully");
    } catch (error) {
      console.error(error);
    }
  }
  
  