import { useSWR } from '@/hooks/useSWR'
import type { MovieGenre } from '@/api/movie'

export type MovieGenres = {
  genres: MovieGenre[]
}

export function useMovieGenres() {
  return useSWR<MovieGenres>('/genre/movie/list')
}
