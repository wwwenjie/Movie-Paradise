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
          <p class="title pl-md-2 mb-0">{{genre}}</p>
        </v-col>
        <v-col
          v-for="(movie,index) in movies"
          :key="index"
          cols="6"
          sm="4"
          class="movie-list-md-col"
          @click="goDetail"
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
              <v-img
                :src="movie.poster"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
                <template v-slot:default>
                  <v-card-title v-text="movie.title" class="pb-0"></v-card-title>
                  <v-card-text class="text--primary pb-1">
                    <div>{{movie.info.region}} / {{$t('movie.douban')}} {{movie.rating.douban_score}} / IMDb
                      {{movie.rating.imdb_score}}
                    </div>
                  </v-card-text>
                </template>
              </v-img>

              <v-card-actions class="hidden-xs-only">
                <v-list-item class="grow">
                  <span>{{movie.year}}</span>
                  <span class="mx-1">·</span>
                  <span>{{movie.info.genre}}</span>
                  <v-row
                    align="center"
                    justify="end"
                  >
                    <v-icon class="mr-1">mdi-heart</v-icon>
                    <v-icon class="mr-1">mdi-share-variant</v-icon>
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
import { message } from '../../utils/message'
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
      movies: [undefinedMovie()]
    }
  },
  methods: {
    goDetail () {
      let movieId = '1'
      router.push({ path: `/movie/${movieId}` })
    }
  },
  mounted () {
    // 3 cols for sm, 2/4 for xs/md
    let limit = this.$vuetify.breakpoint.sm ? 9 : 8
    // preload empty object to load skeleton
    this.movies = [...Array(limit)].map(() => undefinedMovie())
    getMovieByGenre('test', limit).then(res => {
      this.movies = res.movies
      this.loading = false
    }).catch(err => {
      message({ text: err, type: 'error' })
    })
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
