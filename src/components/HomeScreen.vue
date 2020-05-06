<template>
  <v-skeleton-loader
    :loading="loading"
    :types="{ skeleton: 'image@2,list-item-three-line@2' }"
    type="skeleton"
    transition="fade-transition"
    min-height="70vh"
  >
    <v-img
      :src="movie.poster"
      :contain="this.$vuetify.breakpoint.smAndUp"
      :gradient="this.$vuetify.theme.dark ? 'to bottom,rgba(64, 64, 64, 0) 70%,rgba(30, 30, 30, 100) 100%':'to bottom,rgba(150, 150, 150, 0) 70%,rgba(255, 255, 255, 100) 100%'"
      width="100%"
      min-height="40vh"
      max-height="80vh"
      alt="poster"
      @error="error = true"
    >
      <template v-slot:placeholder>
        <v-skeleton-loader
          :boilerplate="error"
          tile
          type="image@2"
        />
      </template>
      <template v-slot:default>
        <v-row
          align="end"
          style="height: 100%"
        >
          <v-row
            justify="center"
          >
            <v-col
              v-if="error"
              cols="12"
              class="text-center"
            >
              <p class="title font-weight-bold mb-0">
                Oops, 海报加载失败
              </p>
              <p class="title font-weight-bold mb-0">
                今天为您推荐:
              </p>
            </v-col>
            <v-col
              cols="12"
              class="text-center pa-0"
            >
              <p class="title font-weight-bold">
                {{ movie.title }}
              </p>
              <p class="mb-0">
                {{ movie.info.genre }}
              </p>
            </v-col>
            <v-col
              cols="3"
              class="text-center"
              style="cursor: pointer"
            >
              <v-icon class="d-block">
                mdi-plus
              </v-icon>
              <span class="caption">加入片库</span>
            </v-col>
            <v-col
              cols="5"
              class="text-center"
            >
              <v-btn
                light
                width="100%"
                class="font-weight-bold mb-2"
                @click="dialog = true"
              >
                <v-icon left>
                  mdi-play
                </v-icon>
                预告片
              </v-btn>
              <movie-detail-video
                :dialog.sync="dialog"
                :trailers="movie.trailers"
              />
            </v-col>
            <v-col
              cols="3"
              class="text-center"
              style="cursor: pointer"
              @click="goDetail(movie._id)"
            >
              <v-icon class="d-block">
                mdi-information-outline
              </v-icon>
              <span class="caption">更多信息</span>
            </v-col>
          </v-row>
        </v-row>
      </template>
    </v-img>
  </v-skeleton-loader>
</template>

<script>
import { undefinedMovie } from '../utils'
import { getMovieByGenre } from '../api/movie'
import MovieDetailVideo from './MovieDetailVideo'
import router from '../router'

export default {
  name: 'HomeScreen',
  components: {
    'movie-detail-video': MovieDetailVideo
  },
  data () {
    return {
      loading: true,
      error: false,
      movie: undefinedMovie(),
      dialog: false,
      videoUrl: '/static/video.mp4',
      videoTitle: '预告片2：终极版'
    }
  },
  async mounted () {
    const movies = await getMovieByGenre('today', 10)
    this.movie = movies[Math.ceil(Math.random() * 10)]
    this.loading = false
  },
  methods: {
    goDetail (movieId = 1) {
      router.push({ path: `/movie/${movieId}` })
    }
  }
}
</script>

<style scoped>

</style>
