export function getImageUrl(path?: string) {
  return path && `https://image.tmdb.org/t/p/original${path}`
}
