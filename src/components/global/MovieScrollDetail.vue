<template>
  <v-sheet tile>
    <div class="ml-4">
      <p class="title">{{detail.title}}</p>
      <p>{{$t('movie.douban')}} {{detail.rating.douban_score}} / IMDb {{detail.rating.imdb_score}}</p>
      <p>{{$t('movie.genre')}}: {{detail.info.genre}}</p>
      <p>{{$t('movie.region')}}: {{detail.info.region}}</p>
      <p>{{$t('movie.year')}}: {{detail.year}}</p>
    </div>
    <v-row
      justify="center"
    >
      <v-col
        cols="3"
        class="pa-0 pt-2 text-center"
      >
        <v-icon class="d-block">mdi-plus</v-icon>
        <span class="caption">加入片库</span>
      </v-col>
      <v-col
        cols="5"
      >
        <v-btn
          light
          width="100%"
          class="font-weight-bold"
          @click="goDetail(detail._id)"
        >
          详情
        </v-btn>
      </v-col>
      <v-col
        cols="3"
        class="pa-0 pt-2 text-center"
      >
        <v-icon class="d-block">mdi-share</v-icon>
        <span class="caption">分享</span>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import router from '../../router'
import { undefinedMovie } from '../../utils'

export default {
  name: 'MovieScrollDetail',
  props: {
    detail: {
      type: Object,
      default: () => undefinedMovie()
    }
  },
  methods: {
    goDetail (movieId) {
      router.push({ path: `/movie/${movieId}` })
    }
  }
}
</script>

<style scoped>

</style>
