import axios from 'axios';

export class UnsplashApiClient {
  private readonly BASE_URL: string = 'https://api.unsplash.com';
  private readonly APP_ID: string = import.meta.env.VITE_UNSPLASH_APP_ID;
  private readonly ACCESS_KEY: string = import.meta.env.VITE_UNSPLASH_API_KEY;
  private readonly DEFAULT_PAGE_SIZE: number = 12;
  private readonly _client = axios.create({
    baseURL: this.BASE_URL,
    headers: {
      Authorization: `Client-ID ${this.ACCESS_KEY}`,
    },
  });

  constructor() {
    if (!this.APP_ID || !this.ACCESS_KEY) {
      throw new Error(
        'Unsplash API credentials are not set in environment variables.'
      );
    }
  }

  public async searchPhotos(query: string, page: number = 1) {
    try {
      const response = await this._client.get('/search/photos', {
        params: {
          query,
          page,
          per_page: this.DEFAULT_PAGE_SIZE,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching photos from Unsplash:', error);
      throw error;
    }
  }
}
