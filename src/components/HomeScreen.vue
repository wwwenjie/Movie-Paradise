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
      min-height="60vh"
      max-height="80vh"
      alt="poster"
      @error="posterLoadFail"
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
                {{ $t('posterLoadFail') }}
              </p>
              <p class="title font-weight-bold mb-0">
                {{ $t('todayRecommend') }}
              </p>
            </v-col>
            <v-col
              cols="12"
              class="text-center pa-0"
            >
              <p class="headline font-weight-bold mb-1">
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
              @click="shuffle"
            >
              <v-icon class="d-block">
                mdi-shuffle-variant
              </v-icon>
              <span class="caption">{{ $t('shuffle') }}</span>
            </v-col>
            <v-col
              cols="5"
              class="text-center"
            >
              <movie-detail-video
                light
                :trailers="movie.trailers"
              />
            </v-col>
            <v-col
              cols="3"
              class="text-center"
              style="cursor: pointer"
              @click="goDetail"
            >
              <v-icon class="d-block">
                mdi-information-outline
              </v-icon>
              <span class="caption">{{ $t('moreInfo') }}</span>
            </v-col>
          </v-row>
        </v-row>
      </template>
    </v-img>
  </v-skeleton-loader>
</template>

<script>
import { undefinedMovie } from '../utils'
import { getTodayMovie } from '../api/movie'
import MovieDetailVideo from './MovieDetailVideo'
import fallbackPoster from '../utils/fallbackPoster'

export default {
  name: 'HomeScreen',
  components: {
    'movie-detail-video': MovieDetailVideo
  },
  data () {
    return {
      movie: undefinedMovie(),
      loading: true,
      error: false
    }
  },
  async mounted () {
    this.movie = await getTodayMovie()
    this.loading = false
  },
  methods: {
    async shuffle () {
      // avoid loading cache
      this.$store.commit('SET_MOVIE_CACHE', { today: null })
      this.movie = await getTodayMovie()
      this.$store.commit('SET_MOVIE_CACHE', { today: this.movie })
    },
    goDetail () {
      this.$router.push({ path: `/movie/${this.movie.path}` })
    },
    posterLoadFail () {
      this.error = fallbackPoster(this.movie)
    }
  }
}
</script>

<style scoped>

</style>
