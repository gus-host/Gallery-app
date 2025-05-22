import { create } from "zustand";
import { ImageStore, FavoriteImageType } from "@/types/ImageTypes";
import { getUnsplashImages } from "@/lib/unsplashService";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "@/lib/favoritesService";

export const useImageStore = create<ImageStore>((set, get) => ({
  images: [],
  query: "",
  selectedOption: "date",
  currentPage: 1,
  imagesPerPage: 15,
  favorites: [],
  galleryItem: [],

  toggleFavorite: async (image: FavoriteImageType, userId: string) => {
    const { favorites } = get();
    const isFavorite = favorites.some((fav) => fav.imageId === image.imageId);
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter(
        (fav) => fav.imageId !== image.imageId
      );
    } else {
      updatedFavorites = [...favorites, image];
    }

    set({ favorites: updatedFavorites });

    const { imageId, imageUrl, description } = image;

    try {
      if (isFavorite) {
        await removeFavorite(userId, imageId);
      } else {
        await addFavorite(userId, imageId, imageUrl, description);
      }
    } catch (error) {
      console.error("Error with favorite operation:", error);
      set({ favorites: favorites });
    }
  },

  loadFavorites: async (userId: string) => {
    try {
      const storedFavorites = await getFavorites(userId);
      set({ favorites: storedFavorites });
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  },

  setQuery: (query) => set({ query: query, currentPage: 1 }),

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  fetchImages: async (
    query = get().query,
    page = get().currentPage,
    perPage = get().imagesPerPage
  ) => {
    const searchQuery = query && query.trim() !== "" ? query : "perros";
    const response = await getUnsplashImages(searchQuery, page, perPage);
    set({ images: response || [] });
  },

  sortImages: (option) => {
    let sortedImages = [...get().images];

    if (option === "likes") {
      sortedImages = sortedImages.sort((a, b) => b.likes - a.likes);
    } else if (option === "date") {
      sortedImages = sortedImages.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    set({ images: sortedImages, selectedOption: option });
  },

  nextPage: () => {
    set((state) => {
      const nextPage = state.currentPage + 1;
      return { currentPage: nextPage };
    });
  },

  prevPage: () => {
    set((state) => {
      const prevPage = state.currentPage > 1 ? state.currentPage - 1 : 1;
      return { currentPage: prevPage };
    });
  },
}));
