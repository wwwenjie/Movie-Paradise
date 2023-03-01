import { useSWR } from '@/hooks/useSWR'
import type { Ref } from 'vue'

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

export function useMovieDetail(id: number) {
  return useSWR<MovieDetail>(`/movie/${id}`)
}

export type MovieVideo = Partial<{
  id: number
  results: { key: string; name: string }[]
}>

export function useMovieVideo(id: Ref) {
  return useSWR<MovieVideo>(() => id.value && `/movie/${id.value}/videos`)
}

export type MovieListResult = {
  id: number
  title: string
  genre_ids: number[]
  poster_path: string
  backdrop_path: string
}

export type PageResult<T> = {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export function useMoviePopular(page: Ref<number>) {
  return useSWR<PageResult<MovieListResult>>(() => `/movie/popular?page=${page.value}`)
}
