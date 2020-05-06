<template>
  <v-card
    class="mx-auto"
    width="100%"
    tile
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
          <p class="title pl-md-2 mb-0">
            {{ genre }}
          </p>
        </v-col>
        <v-col
          v-for="(movie,index) in movies"
          :key="index"
          cols="6"
          sm="4"
          class="movie-list-md-col"
          @click="goDetail(movie._id)"
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
                @error="$set(error, index, true)"
              >
                <template v-slot:placeholder>
                  <v-skeleton-loader
                    :boilerplate="error[index]"
                    tile
                    type="image@3"
                  />
                </template>
                <template v-slot:default>
                  <v-card-title
                    class="white--text pb-0"
                    v-text="movie.title"
                  />
                  <v-card-text class="white--text pb-1">
                    <div>
                      {{ movie.info.region }} / {{ $t('movie.douban') }} {{ movie.rating.douban_score }} / IMDb
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
import { getMovieByGenre } from '../../api/movie'

export default {
  name: 'MovieList',
  props: {
    genre: {
      type: String,
      default: 'Default'
    }
  },
  data () {
    return {
      loading: true,
      error: [false],
      movies: [undefinedMovie()]
    }
  },
  async mounted () {
    // 3 cols for sm, 2/4 for xs/md
    let limit = this.$vuetify.breakpoint.sm ? 9 : 8
    // preload empty object to load skeleton
    this.error = [...Array(limit)].map(() => false)
    this.movies = [...Array(limit)].map(() => undefinedMovie())
    this.movies = await getMovieByGenre('test', limit)
    this.loading = false
  },
  methods: {
    goDetail (id) {
      router.push({ path: `/movie/${id}` })
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
</style>
