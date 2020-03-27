<template>
  <v-sheet
    width="100%"
    class="fill-height"
  >
    <v-toolbar
      dense
      flat
    >
      <v-toolbar-title>半个喜剧 Almost a Comedy</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="goBack">
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-img
      width="100%"
      max-height="50vh"
      :src="posterUrl"
      alt="Movie Poster Cover"
      gradient="to bottom,rgba(64, 64, 64, 0) 60%,rgba(30, 30, 30, 100) 100%"
      class="cover"
    />
    <v-img
      v-class="{pad:'mt-4',laptop:'mt-12'}"
      width="40%"
      height="30vh"
      :src="posterUrl"
      alt="Movie Poster"
      class="mx-auto"
    />
    <v-row
      no-gutters
      justify="space-around"
      class="index"
    >
      <v-col
        cols="12"
        class="text-center mt-2"
      >
        <span class="body-1 mx-2 font-weight-bold">2019</span>
        <span class="body-1 mx-2 font-weight-bold">喜剧/爱情</span>
        <span class="body-1 mx-2 font-weight-bold">111分钟</span>
      </v-col>
      <v-col
        cols="12"
        class="text-center"
      >
        <v-btn
          depressed width="90%"
          class="mt-4 red"
          @click="dialog=true">
          <v-icon left>mdi-play</v-icon>
          预告片
        </v-btn>
        <movie-detail-video
          :dialog.sync="dialog"
          :src="videoUrl"
          :title="videoTitle"
        />
      </v-col>
      <v-col
        cols="12"
      >
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
        <span class="caption grey--text">演员: 任素汐 / 吴昱翰 / 刘迅 / 汤敏 / 赵海燕</span>
      </v-col>
      <v-col
        cols="4"
        class="px-6 text-center"
      >
        <v-icon class="d-block">mdi-plus</v-icon>
        <span class="caption grey--text">加入片库</span>
      </v-col>
      <v-col
        cols="4"
        class="px-6 text-center"
      >
        <v-icon class="d-block">mdi-download</v-icon>
        <span class="caption grey--text">下载链接</span>
      </v-col>
      <v-col
        cols="4"
        class="px-6 text-center"
      >
        <v-icon class="d-block">mdi-heart</v-icon>
        <span class="caption grey--text">加入喜欢</span>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <movie-list
      genre="相关影片"
      :show-extend="this.$vuetify.breakpoint.mdAndUp"
      :flex="this.$vuetify.breakpoint.smAndUp?3:6"
    />
  </v-sheet>
</template>

<script>
import MovieList from '../components/global/MovieList'
import MovieDetailVideo from '../components/MovieDetailVideo'

export default {
  name: 'MovieDetail',
  props: ['movieId'],
  components: {
    'movie-list': MovieList,
    'movie-detail-video': MovieDetailVideo
  },
  data () {
    return {
      posterUrl: '/static/test.jpg',
      dialog: false,
      videoUrl: '/static/video.mp4',
      videoTitle: '预告片2：终极版'
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  },
  mounted () {
    this.$vuetify.goTo(0)
  }
}
</script>

<style scoped>
  .index div {
    z-index: 1;
  }

  .cover {
    position: absolute;
    filter: blur(20px);
  }
</style>
