import * as PexelTypes from "./PexelTypes";

class PexelController {
  private readonly baseUrl: string;
  private readonly videosUrl: string;
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.baseUrl = "https://api.pexels.com/v1";
    this.videosUrl = "https://api.pexels.com/videos";
    this.apiKey = apiKey;
  }

   public async getRandomCollectionsWithMedias( params: PexelTypes.GetRandomCollectionsParams): Promise<PexelTypes.Collection[]> {
    const { collectionPage, collectionsCount, mediaPage=1, mediaCount=15, mediaType="all", sortOrder="asc"  } = params;

    try {
      const featuredCollections = await this.getFeaturedCollections(collectionPage, collectionsCount);
  
      const collectionsWithMedias = await Promise.all(
        featuredCollections.collections.map(async (collection) => {
          const medias = await this.getMediasByCollectionId({
            collectionId: collection.id,
            type: mediaType,
            sort: sortOrder,
            page: mediaPage,
            per_page: mediaCount
          });
          return {...collection, medias};
        })
      );

      return collectionsWithMedias;

    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Erreur lors de la récupération des collections aléatoires : ${error.message}`);
      }
      throw new Error(`Erreur inconnue lors de la récupération des collections aléatoires : ${error}`);
    }
  }

  async getFeaturedCollections(pageNum: number=1, collectionsNum: number=15): Promise<PexelTypes.FeaturedCollections> {
    const url = `${this.baseUrl}/collections/featured?page=${pageNum}&per_page=${collectionsNum}`;
    try {
      return (await this.fetchJson(url)) as PexelTypes.FeaturedCollections;
    } catch (error: unknown) {
      if (error instanceof Error) throw new Error(`Error fetching featured collections: ${error.message}`);
      throw new Error(`Unknown error fetching featured collections: ${error}`);
    }
  }

  async getMediasByCollectionId(params: PexelTypes.GetMediasByCollectionParams): Promise<PexelTypes.CollectionMedias> {
    const url = `${this.baseUrl}/collections/${params.collectionId}?type=${params.type}&sort=${params.sort}&page=${params.page}&per_page=${params.per_page}`;
    try {
      return (await this.fetchJson(url)) as PexelTypes.CollectionMedias;
    } catch (error: unknown) {
      if (error instanceof Error) throw new Error(`Error fetching collection medias: ${error.message}`);
      throw new Error(`Unknown error fetching collection medias: ${error}`);
    }
  }

  private async fetchJson(url: string): Promise<any> {
    const response = await fetch(url, { headers: { Authorization: this.apiKey } });
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
}

export default PexelController;
