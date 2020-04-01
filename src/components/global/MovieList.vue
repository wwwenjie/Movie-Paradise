<template>
  <v-card
    class="mx-auto"
    width="100%"
    tile
  >
    <v-container fluid>
      <v-row
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
          v-for="(card,index) in cards"
          :key="index"
          cols="6"
          sm="4"
          class=movie-list-md-col
          @click="goDetail"
        >
          <v-card
            :loading="loading?'secondary':false"
            hover
          >
            <v-img
              :src="card.src"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title v-text="card.title" class="pb-0"></v-card-title>
              <v-card-text class="text--primary pb-1">
                <div>{{card.origin}} / {{$t('movie.douban')}} {{card.douban_rate}} / IMDb {{card.IMDb_rate}}</div>
                <div></div>
              </v-card-text>
            </v-img>

            <v-card-actions class="hidden-xs-only">
              <v-list-item class="grow">
                <span>{{card.date}}</span>
                <span class="mx-1">·</span>
                <span>{{card.genre}}</span>
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
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import router from '../../router'

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
      loading: false,
      cards: [
        {
          title: '爱尔兰人',
          src: '/static/movie/1.jpg',
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }, {
          title: '爱尔兰人',
          src: '/static/movie/1.jpg',
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }, {
          title: '爱尔兰人',
          src: '/static/movie/1.jpg',
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }, {
          title: '爱尔兰人',
          src: '/static/movie/1.jpg',
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }, {
          title: '爱尔兰人',
          src: '/static/movie/1.jpg',
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }, {
          title: '爱尔兰人',
          src: '/static/movie/1.jpg',
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }, {
          title: '爱尔兰人',
          src: '/static/movie/1.jpg',
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }, {
          title: '爱尔兰人',
          src: '/static/movie/1.jpg',
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }
      ]
    }
  },
  methods: {
    goDetail () {
      let movieId = '1'
      router.push({ path: `/movie/${movieId}` })
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
