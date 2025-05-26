export interface User {
  id: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  instagram_username: string | null;
  twitter_username: string | null;
  portfolio_url: string | null;
  profile_image: ProfileImage;
  links: UserLinks;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
}

export interface ImageUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface ImageLinks {
  self: string;
  html: string;
  download: string;
}

export interface Image {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string | null;
  user: User;
  urls: ImageUrls;
  links: ImageLinks;
}