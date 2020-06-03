<template>
  <v-card
    class="mx-auto"
    width="100%"
    tile
    flat
  >
    <v-container fluid>
      <v-row
        align="center"
        justify="space-around"
        class="mx-sm-4"
      >
        <v-col
          cols="12"
          class="pb-0"
        >
          <span
            class="pl-md-2 pl-lg-3 mb-0 headline"
          >
            {{ title }}
          </span>
          <v-btn
            v-if="$route.path === '/'"
            outlined
            small
            top
            class="ml-2 mb-2"
            @click="goMore"
          >
            More
          </v-btn>
        </v-col>
        <v-col
          v-for="(movie,index) in movies"
          :key="index"
          cols="6"
          sm="4"
          class="movie-list-md-col"
          @click="goDetail(movie.path)"
        >
          <v-skeleton-loader
            :loading="loading"
            type="card"
            transition="fade-transition"
          >
            <v-card
              :loading="loading?'secondary':false"
              hover
              style="border-radius: 0"
            >
              <!--aspect-ratio: 650/950-->
              <v-img
                :src="movie.poster"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                aspect-ratio="0.684"
                class="align-end"
                @error="posterLoadFail(index)"
              >
                <template v-slot:placeholder>
                  <v-skeleton-loader
                    :boilerplate="error[index]"
                    tile
                    type="image@3"
                  />
                  <div
                    v-if="error[index]"
                    class="movie-list-error"
                  >
                    <v-row
                      style="height: inherit"
                      align-content="center"
                      justify="center"
                    >
                      <v-icon
                        x-large
                        color="white"
                      >
                        mdi-image-off
                      </v-icon>
                    </v-row>
                  </div>
                </template>
                <template v-slot:default>
                  <v-card-title
                    class="white--text pb-0"
                    v-text="movie.title"
                  />
                  <v-card-text class="white--text pb-1">
                    <div>
                      {{ movie.info.region }} / {{ $t('douban') }} {{ movie.rating.douban_score }} / IMDb
                      {{ movie.rating.imdb_score }}
                    </div>
                  </v-card-text>
                </template>
              </v-img>

              <v-card-actions class="hidden-xs-only">
                <v-list-item class="grow">
                  <span>{{ movie.year }}</span>
                  <span class="mx-1">·</span>
                  <span>{{ movie.info.genre }}</span>
                  <v-row
                    align="center"
                    justify="end"
                  >
                    <v-icon class="mr-1">
                      mdi-heart
                    </v-icon>
                    <v-icon class="mr-1">
                      mdi-share-variant
                    </v-icon>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import router from '../../router'
import { undefinedMovie } from '../../utils'
import { getMovieByIds, getMovieByGenre, getMovieByType } from '../../api/movie'
import fallbackPoster from '../../utils/fallbackPoster'

export default {
  name: 'MovieList',
  props: {
    title: {
      type: String,
      default: undefined
    },
    type: {
      type: String,
      default: undefined
    },
    ids: {
      type: Array,
      default: undefined
    },
    genre: {
      type: String,
      default: undefined
    },
    searchResult: {
      type: Array,
      default: undefined
    }
  },
  data () {
    return {
      loading: true,
      error: [false],
      movies: [undefinedMovie()]
    }
  },
  watch: {
    ids: async function (ids) {
      if (ids) {
        this.movies = await getMovieByIds(ids)
        this.loading = false
      }
    },
    searchResult: {
      handler (searchResult) {
        this.movies = searchResult
        this.loading = false
      },
      deep: true
    }
  },
  async mounted () {
    // 3 cols for sm, 2/4 for xs/md
    let limit = this.$vuetify.breakpoint.sm ? 9 : 8
    // preload empty object to load skeleton
    this.error = [...Array(limit)].map(() => false)
    this.movies = [...Array(limit)].map(() => undefinedMovie())
    if (this.type) {
      this.movies = await getMovieByType(this.type, limit)
      this.loading = false
    } else if (this.ids) {
      // watch ids to get movies, need to wait father props ready
    } else if (this.searchResult) {
      // watch
    } else {
      this.movies = await getMovieByGenre(this.genre, limit)
      this.loading = false
    }
  },
  methods: {
    goDetail (path) {
      router.push({ path: `/movie/${path}` })
    },
    goMore () {
      if (this.type) {
        router.push({ path: '/movies', query: { type: this.type, title: this.title } })
      }
      if (this.genre) {
        router.push({ path: '/movies', query: { genre: this.genre, title: this.title } })
      }
    },
    posterLoadFail (index) {
      let movie = this.movies[index]
      this.$set(this.error, index, fallbackPoster(movie))
    }
  }
}
</script>

<style lang="sass">
  $width: 23%
  /*md and up 960px*/
  @media (min-width: 960px)
    .movie-list-md-col
      width: $width
      max-width: $width
      flex-basis: $width
  .movie-list-error
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
</style>
