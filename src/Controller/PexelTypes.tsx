// Type pour les différentes résolutions d'une photo
export type PhotoSrc = {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
};

// Type pour une photo
export type Photo = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PhotoSrc;
  liked: boolean;
  alt: string;
};

// Type pour un fichier vidéo
export type VideoFile = {
  id: number;
  quality: string;
  file_type: string;
  width: number | null;
  height: number | null;
  link: string;
};

// Type pour une image de prévisualisation de la vidéo
export type VideoPicture = {
  id: number;
  picture: string;
  nr: number;
};

// Type pour l'utilisateur qui a uploadé la vidéo
export type VideoUser = {
  id: number;
  name: string;
  url: string;
};

// Type pour une vidéo
export type Video = {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string; // miniature principale
  duration: number;
  user: VideoUser;
  video_files: VideoFile[];
  video_pictures: VideoPicture[];
};

// Réponse d’une collection contenant des médias
export type CollectionMedias = {
  id: string;
  media: MediaItem[];
  page: number;
  per_page: number;
  total_results: number;
  next_page?: string;
  prev_page?: string;
};

// Type pour une collection
export type Collection = {
  id: string; 
  title: string;
  description: string;
  private: boolean;
  media_count: number;
  photos_count: number;
  videos_count: number;
  medias?: CollectionMedias;
};

// Type pour les collections mises en avant
export type FeaturedCollections = {
  collections: Collection[];
  page: number; 
  per_page: number;
  total_results: number;
  next_page: string;
  prev_page: string;
};

// Union discriminée pour un élément média (photo ou vidéo)
export type MediaItem =
  | ({ type: "Photo" } & Photo)
  | ({ type: "Video"; full_res: string | null; tags: string[]; avg_color: string | null } & Video);

export type GetMediasByCollectionParams = {
    collectionId: string,
    type?: "photos" | "videos" | "all",
    sort?: "asc" | "desc",
    page?: number,
    per_page?: number
}

export type GetRandomCollectionsParams = {
    collectionPage?: number;                
    collectionsCount?: number;               
    mediaPage?: number;                       
    mediaCount?: number;                 
    mediaType?: "photos" | "videos" | "all"; 
    sortOrder?: "asc" | "desc";
};