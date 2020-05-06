<template>
  <v-sheet
    width="100%"
    class="fill-height"
  >
    <v-toolbar
      dense
      flat
      class="movie-detail-header"
      :style="{'background-color':this.$vuetify.theme.isDark ? 'rgb(39, 39, 39, 0.6)':'rgb(255, 255, 255, 0.6)','top':this.$vuetify.breakpoint.mdAndDown?'0':'48px'}"
    >
      <v-toolbar-title>{{ movie.title }} {{ movie.title_en }}</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click="goBack"
      >
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row
      justify="center"
    >
      <v-col cols="12">
        <!--TODO: douban img return 403, use dianying api or local poster-->
        <v-img
          width="100%"
          max-height="50vh"
          :src="movie.poster"
          alt="Movie Poster Cover"
          gradient="to bottom,rgba(64, 64, 64, 0) 60%,rgba(30, 30, 30, 100) 100%"
          class="movie-detail-cover"
        />
      </v-col>
      <v-col
        cols="8"
        sm="5"
        md="3"
      >
        <v-img
          :src="movie.poster"
          alt="Movie Poster"
          class="mx-auto"
        >
          <template v-slot:default>
            <v-row>
              <v-col
                cols="12"
                class="text-center"
              >
                <p class="title font-weight-bold mb-0">
                  Oops, 海报加载失败
                </p>
              </v-col>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <v-row
      no-gutters
      justify="space-around"
      class="movie-detail-index"
    >
      <v-col
        cols="12"
        class="text-center mt-2"
      >
        <span class="body-1 mx-2 font-weight-bold">{{ movie.year }}</span>
        <span class="body-1 mx-2 font-weight-bold">{{ movie.info.genre }}</span>
        <span class="body-1 mx-2 font-weight-bold">{{ movie.info.duration }}</span>
      </v-col>
      <v-col
        cols="12"
        class="text-center"
      >
        <v-btn
          depressed
          :disabled="!movie.trailers"
          width="90%"
          class="mt-4 red"
          @click="dialog = true"
        >
          <v-icon left>
            mdi-play
          </v-icon>
          {{ movie.trailers? '预告片':'暂无预告片' }}
        </v-btn>
        <movie-detail-video
          :dialog.sync="dialog"
          :trailers="movie.trailers"
        />
      </v-col>
      <v-col cols="12">
        <v-expansion-panels flat>
          <v-expansion-panel style="background-color: transparent !important;">
            <v-expansion-panel-header class="mt-4 py-0 text-justify body-2">
              三个自由浪漫的年轻人，过着各怀心思的人生：有人急着摆脱单身，有人想在结婚前放荡一番，有人想在大城市站稳脚跟。
            </v-expansion-panel-header>
            <v-expansion-panel-content class="text-justify body-2">
              因为一次情感出轨，三人扭结成了一团“嬉笑怒骂”的乱麻。当各种价值观碰撞在一起， 当一个人需要平衡亲情友情与爱情......他们慌乱的生活，就像是半个喜剧。
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col
        cols="12"
        class="px-6"
      >
        <span class="caption grey--text">演员: {{ movie.info.actors }}</span>
      </v-col>
      <v-col
        cols="4"
        class="px-6 text-center"
      >
        <v-icon class="d-block">
          mdi-plus
        </v-icon>
        <span class="caption grey--text">加入片库</span>
      </v-col>
      <v-col
        cols="4"
        class="px-6 text-center"
      >
        <v-icon class="d-block">
          mdi-download
        </v-icon>
        <span class="caption grey--text">下载链接</span>
      </v-col>
      <v-col
        cols="4"
        class="px-6 text-center"
      >
        <v-icon class="d-block">
          mdi-heart
        </v-icon>
        <span class="caption grey--text">加入喜欢</span>
      </v-col>
    </v-row>
    <v-divider />
    <movie-list genre="相关影片" />
  </v-sheet>
</template>

<script>
import MovieList from '../components/global/MovieList'
import MovieDetailVideo from '../components/MovieDetailVideo'
import { getMovie } from '../api/movie'
import { undefinedMovie } from '../utils'

export default {
  name: 'MovieDetail',
  components: {
    'movie-list': MovieList,
    'movie-detail-video': MovieDetailVideo
  },
  props: ['movieId'],
  data () {
    return {
      movie: undefinedMovie(),
      dialog: false
    }
  },
  async mounted () {
    this.$vuetify.goTo(0)
    this.movie = await getMovie(this.movieId)
  },
  // same components update data
  async beforeRouteUpdate (to, from, next) {
    next()
    this.$vuetify.goTo(0)
    this.movie = await getMovie(to.params.movieId)
  },
  methods: {
    goBack () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss">
  .movie-detail {
    &-header {
      z-index: 2;
      position: sticky;
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      backdrop-filter: saturate(180%) blur(20px);
    }

    &-cover {
      position: absolute;
      filter: blur(20px);
    }

    &-index div {
      z-index: 1;
    }
  }
</style>
