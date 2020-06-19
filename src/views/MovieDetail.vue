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
          @error="posterLoadFail"
        >
          <template v-slot:default>
            <v-row
              v-if="error"
            >
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
      class="movie-detail-index mx-0 mx-sm-8"
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
        class="text-center px-6"
      >
        <movie-detail-video
          :trailers="movie.trailers"
        />
      </v-col>
      <v-col cols="12">
        <!--todo: load more text in md and up-->
        <v-expansion-panels flat>
          <v-expansion-panel style="background-color: transparent !important;">
            <v-expansion-panel-header class="mt-4 py-0 text-justify body-2">
              {{ movie.info.summary.slice(0,100).trim() }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="text-justify body-2">
              {{ movie.info.summary.substring(100).trim() }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col
        cols="12"
        class="px-6"
      >
        <span class="caption grey--text">{{ $t('actors') }}: {{ movie.info.actors }}</span>
      </v-col>
      <v-col
        cols="4"
        class="px-6 text-center"
      >
        <v-btn
          text
          x-large
          class="px-0"
          @click="addMovieToUser(movie._id,'list')"
        >
          <div>
            <v-icon class="d-block">
              mdi-plus
            </v-icon>
            <span class="caption grey--text">
              {{ $t('addList') }}
            </span>
          </div>
        </v-btn>
      </v-col>
      <v-col
        cols="4"
        class="px-6 text-center"
      >
        <v-btn
          text
          x-large
          class="px-0"
          @click="todo"
        >
          <div>
            <v-icon class="d-block">
              mdi-download
            </v-icon>
            <span class="caption grey--text">
              {{ $t('downloadLink') }}
            </span>
          </div>
        </v-btn>
      </v-col>
      <v-col
        cols="4"
        class="px-6 text-center"
      >
        <v-btn
          text
          x-large
          class="px-0"
          @click="addMovieToUser(movie._id,'like')"
        >
          <div>
            <v-icon class="d-block">
              mdi-heart
            </v-icon>
            <span class="caption grey--text">
              {{ $t('addLike') }}
            </span>
          </div>
        </v-btn>
      </v-col>
    </v-row>
    <movie-detail-comment
      :show-btn.sync="showBtn"
      :movie="movie"
    />
    <movie-list
      :title="movie.recs ? $t('relatedMovies') : $t('mayLike')"
      :ids="movie.recs ? movie.recs : null"
      :genre="movie.recs ? null : movie.info.genre.split('/')[0]"
    />
  </v-sheet>
</template>

<script>
import MovieList from '../components/global/MovieList'
import MovieDetailVideo from '../components/MovieDetailVideo'
import MovieDetailComment from '../components/MovieDetailComment'
import userMixin from '../mixins/userMixin'
import appMixin from '../mixins/appMixin'
import { getMovieByPath } from '../api/movie'
import { undefinedMovie } from '../utils'
import fallbackPoster from '../utils/fallbackPoster'
import { patchTrailers, patchBackdrops, headPoster, patchPoster } from '../api/improvement'

export default {
  name: 'MovieDetail',
  components: {
    'movie-list': MovieList,
    'movie-detail-video': MovieDetailVideo,
    'movie-detail-comment': MovieDetailComment
  },
  mixins: [userMixin, appMixin],
  props: {
    path: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      movie: undefinedMovie(),
      error: false,
      showBtn: false
    }
  },
  // exit component and enter again
  async beforeRouteEnter (to, from, next) {
    next(async vm => {
      await vm.init(vm, to.params.path)
    })
  },
  // same components update data
  async beforeRouteUpdate (to, from, next) {
    next()
    await this.init(this, to.params.path)
  },
  methods: {
    async init (_this, path) {
      _this.$vuetify.goTo(0)
      _this.movie = await getMovieByPath(path)
      const allow = _this.$store.state.allowImprove.allow
      const id = _this.movie._id
      // trailers = [] means no trailers, null means need patch
      if (_this.movie.trailers === null) {
        this.movie.trailers = await patchTrailers(id)
      }
      if (_this.movie.backdrops === null && allow) {
        await patchBackdrops(_this.movie.path)
      }
      if (allow) {
        try {
          await headPoster(id)
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('404 not found, adding this poster to our oss. thanks for improvement')
          await patchPoster(id)
        }
      }
    },
    posterLoadFail () {
      this.error = fallbackPoster(this.movie)
    },
    // todo: back but remove movie detail routes
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
