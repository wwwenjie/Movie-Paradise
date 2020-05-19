import Config from '../config'
export default function fallbackPoster (movie) {
  const fallbackUrl = Config.fallbackUrl.map(url => {
    return `${url}${movie._id}.jfif`
  })
  const index = fallbackUrl.indexOf(movie.poster)
  if (index === fallbackUrl.length - 1) {
    return true
  } else {
    movie.poster = fallbackUrl[index + 1]
  }
}
