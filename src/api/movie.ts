import { useSWR } from '@/hooks/useSWR'

export type MovieGenre = {
  id: number
  name: string
}

export type MovieDetail = Partial<{
  id: number
  title: string
  genres: MovieGenre[]
  poster_path: string
  backdrop_path: string
}>

export function useMovieDetail(id: string | number) {
  return useSWR<MovieDetail>(`/movie/${id}`)
}

export type MovieVideo = Partial<{
  id: number
  results: { key: string; name: string }[]
}>

export function useMovieVideo(id: string | number) {
  return useSWR<MovieVideo>(`/movie/${id}/videos`)
}
