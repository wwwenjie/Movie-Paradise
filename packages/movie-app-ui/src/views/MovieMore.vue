<template>
  <v-sheet
    width="100%"
    min-height="100%"
  >
    <movie-list
      v-show="!loading"
      :title="$route.query.title"
      :movie-array="movies"
    />
    <p
      ref="load"
      class="display-1 justify-center d-flex"
    >
      Loading...
    </p>
    <v-progress-linear
      indeterminate
      color="red"
    />
  </v-sheet>
</template>

<script>
import { getMovieByGenre, getMovieByType } from '../api/movie'
import MovieList from '../components/global/MovieList'

export default {
  name: 'MovieMore',
  components: {
    'movie-list': MovieList
  },
  data () {
    return {
      movies: [],
      loading: true,
      offset: undefined,
      intersectionObserver: undefined
    }
  },
  async beforeRouteEnter (to, from, next) {
    next(async vm => {
      vm.init(vm)
    })
  },
  async beforeRouteUpdate (to, from, next) {
    next()
    await this.init(this)
  },
  methods: {
    async init (_this) {
      _this.$vuetify.goTo(0)
      const initLimit = _this.$vuetify.breakpoint.sm ? 21 : 16
      const defaultAppend = _this.$vuetify.breakpoint.sm ? 9 : 8
      _this.loading = true
      _this.movies = await _this.getMovies(initLimit)
      _this.loading = false
      _this.offset = initLimit
      // remove previous
      if (_this.intersectionObserver) {
        _this.intersectionObserver.unobserve(_this.$refs.load)
      }
      _this.intersectionObserver = new IntersectionObserver(
        async entries => {
          if (entries[0].intersectionRatio <= 0) return
          const appendMovies = await _this.getMovies(defaultAppend, _this.offset)
          _this.movies = _this.movies.concat(appendMovies)
          _this.offset += defaultAppend
        })
      _this.intersectionObserver.observe(_this.$refs.load)
    },
    getMovies (limit = 16, offset = 0) {
      const query = this.$route.query
      if (query.type) {
        return getMovieByType(query.type, limit, offset)
      }
      if (query.genre) {
        return getMovieByGenre(query.genre, limit, offset)
      }
    }
  }
}
</script>

<style scoped>

</style>
