
export interface ImageType {
    imageId: string;
    imageUrl: string;
    description: string;
    likes:number;
    created_at:string;
}

export interface FavoriteImageType {
  imageId: string;
  imageUrl: string;
  description: string;
}

export interface UnsplashImageType {
  id: string;
  urls: {
    small: string;
  };
  alt_description?: string;
  likes:number;
  created_at:string;
}

export interface ImageStore {
  images: ImageType[];
  query: string;
  selectedOption: "date" | "likes";
  currentPage: number;
  imagesPerPage: number;
  favorites: FavoriteImageType[];

  setCurrentPage: (page: number) => void;
  setQuery: (query: string) => void;
  fetchImages: (query?: string, page?: number, perPage?: number) => Promise<void>;
  sortImages: (option: "date" | "likes") => void;
  nextPage: () => void;
  prevPage: () => void;
  toggleFavorite: (image: FavoriteImageType, userId: string) => Promise<void>;
  loadFavorites: (userId:string) => void;
}
