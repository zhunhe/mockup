export interface Movie {
  id: number;
  name?: string;
  title?: string;
  poster_path?: string;
  backdrop_path?: string;
  media_type?: string;
  original_name?: string;
  overview?: string;
  videos?: {
    results: { key: string }[]
  };
  [key: string]: any;
}
