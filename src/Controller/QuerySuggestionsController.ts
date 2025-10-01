class QuerySuggestionsController {
  private readonly baseUrl: string;
  private readonly options: RequestInit;

  constructor(apiKey: string) {
    this.baseUrl = "https://auto-suggest-queries.p.rapidapi.com/suggestqueries?query=";
    this.options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "auto-suggest-queries.p.rapidapi.com",
      }
    }
  }

  async getQuerySuggestions(searchTerm: string): Promise<string[]> {
    try {
      const response = await fetch(this.baseUrl + encodeURIComponent(searchTerm), this.options);
      if (!response.ok) {
        console.error(`HTTP Error: ${response.status} ${response.statusText}`);
        return [];
      }
      const data = await response.json();
      if(Array.isArray(data)) return data as string[];
      console.warn("Unexpected response", data);
      return [];
    } catch (error: unknown) {
      if (error instanceof Error) throw new Error(`Error fetching query suggestions: ${error.message}`);
      throw new Error(`Unknown error fetching query suggestions: ${error}`);
    }
  }
}

export default QuerySuggestionsController;