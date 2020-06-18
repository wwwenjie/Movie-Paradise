<template>
  <v-sheet
    class="mx-auto"
  >
    <v-skeleton-loader
      :loading="loading"
      type="chip"
      transition="fade-transition"
    >
      <p class="title ml-2 mb-0">
        {{ title }}
      </p>
    </v-skeleton-loader>
    <v-skeleton-loader
      :loading="loading"
      type="image"
      transition="fade-transition"
    >
      <div class="px-1 movie-scroll-img">
        <v-img
          v-for="(movie,index) in movies"
          :key="index"
          :gradient="active === index ? 'to bottom,rgba(64, 64, 64, 0) 0%,rgba(64, 64, 64, 50) 100%' : undefined"
          :src="movie.poster"
          class="mx-1"
          aspect-ratio="0.684"
          width="30vw"
          min-width="120px"
          @error="posterLoadFail(index)"
          @click="active = index"
        >
          <template v-slot:placeholder>
            <v-skeleton-loader
              :boilerplate="error[index]"
              tile
              type="image@2"
            />
            <div
              class="d-flex align-center fill-height text-center"
              style="position: absolute;top: 0; width: 100%"
            >
              <span
                class="headline mx-auto"
                style="white-space:normal;word-break: break-all;"
              >
                {{ movie.title }}
              </span>
            </div>
          </template>
          <template v-slot:default>
            <v-scale-transition>
              <v-row
                v-if="active === index"
                class="fill-height"
                align="center"
                justify="center"
                @click.stop="active=undefined"
              >
                <v-icon
                  color="white"
                  size="48"
                  v-text="'mdi-close-circle-outline'"
                />
              </v-row>
            </v-scale-transition>
          </template>
        </v-img>
        <div
          ref="load"
          class="d-flex align-center"
        >
          <v-progress-circular
            :size="70"
            :width="7"
            indeterminate
            color="red"
            class="mx-4 my-auto"
          />
        </div>
      </div>
    </v-skeleton-loader>
    <v-expand-transition>
      <movie-scroll-detail
        v-if="active !== undefined"
        :detail="movies[active]"
      />
    </v-expand-transition>
  </v-sheet>
</template>

<script>
import MovieScrollDetail from './MovieScrollDetail'
import { undefinedMovie } from '../../utils'
import { getMovieByGenre, getMovieByType } from '../../api/movie'
import fallbackPoster from '../../utils/fallbackPoster'

export default {
  name: 'MovieScroll',
  components: {
    'movie-scroll-detail': MovieScrollDetail
  },
  props: {
    title: {
      type: String,
      default: undefined
    },
    type: {
      type: String,
      default: undefined
    },
    genre: {
      type: String,
      default: undefined
    }
  },
  data: function () {
    return {
      loading: true,
      active: undefined,
      error: [false],
      movies: [undefinedMovie()],
      limit: 6,
      offset: 0
    }
  },
  async mounted () {
    this.error = [...Array(this.limit)].map(() => false)
    this.movies = [...Array(this.limit)].map(() => undefinedMovie())
    this.loading = false
    this.movies = await this.getMovies()
    await new Promise(resolve => setTimeout(resolve, 500))
    const intersectionObserver = new IntersectionObserver(
      async entries => {
        if (entries[0].intersectionRatio <= 0) return
        this.offset += this.limit
        this.movies = this.movies.concat(await this.getMovies())
      })
    this.$nextTick(() => {
      intersectionObserver.observe(this.$refs.load)
    })
  },
  methods: {
    posterLoadFail (index) {
      const movie = this.movies[index]
      this.$set(this.error, index, fallbackPoster(movie))
    },
    getMovies () {
      if (this.type) {
        return getMovieByType(this.type, this.limit, this.offset)
      } else {
        return getMovieByGenre(this.genre, this.limit, this.offset)
      }
    }
  }
}
</script>

<style lang="sass">
  .movie-scroll-img
    display: inline-flex
    overflow-x: scroll
    width: 100vw
    /*firefox*/
    scrollbar-width: none
    /*chrome safari*/

    &::-webkit-scrollbar
      display: none
</style>
