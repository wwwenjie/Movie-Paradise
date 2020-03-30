// return a definedMovie detail structure
// detail from `https://api.dianying.fm/movies/${title_en}` or `https://api.dianying.fm/movies?ids=${id}`
export function undefinedMovie () {
  return {
    _id: undefined,
    info: {
      director: undefined,
      writer: undefined,
      actors: undefined,
      genre: undefined,
      region: undefined,
      language: undefined,
      release: undefined,
      duration: undefined,
      alias: undefined,
      summary: undefined
    },
    imdb_id: undefined,
    title: undefined,
    year: undefined,
    title_en: undefined,
    rating: {
      douban_score: undefined,
      douban_votes: undefined,
      tags: undefined,
      imdb_score: undefined,
      imdb_votes: undefined
    },
    poster: undefined,
    recs: [],
    path: undefined,
    update_time: undefined,
    tmdb_id: undefined
  }
}
