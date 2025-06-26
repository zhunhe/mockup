export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
  ORIGINAL: 'original',
  W500: 'w500',
  W780: 'w780',
  W1280: 'w1280',
} as const;

export const getImageUrl = (path: string, size: keyof typeof IMAGE_SIZES = 'ORIGINAL') => {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES[size]}/${path}`;
};

export const getPosterUrl = (path: string) => getImageUrl(path, 'W500');
export const getBackdropUrl = (path: string) => getImageUrl(path, 'ORIGINAL');
