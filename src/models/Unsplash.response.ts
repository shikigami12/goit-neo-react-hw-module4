import { Image } from './Image.ts';

export interface UnsplashResponse {
  total: number;
  total_pages: number;
  results: Image[];
}
