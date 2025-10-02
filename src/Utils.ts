class Utils {
  constructor() {}

  public generateUrl(url: string, params: Record<string, any>): string {
    const query = Object.entries(params)
      .filter(([_, value]) => value !== null && value !== undefined && value !== "")
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");

    return query ? `${url}?${query}` : url;
  }
}

export default Utils;