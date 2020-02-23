<template>
  <v-card
    class="mx-auto"
    width="100%"
    tile
  >
    <p class="title ml-3 mb-0">{{genre}}</p>
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="(card,index) in cards"
          :key="index"
          :cols=flex
        >
          <v-card
            hover
            :loading="loading?'secondary':false"
          >
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-if="showExtend" v-text="card.title" class="pb-0"></v-card-title>
              <v-card-text class="text--primary pb-1">
                <div>{{card.origin}} / {{$t('movie.douban')}} {{card.douban_rate}} / IMDb {{card.IMDb_rate}}</div>
                <div></div>
              </v-card-text>
            </v-img>

            <v-card-actions v-if="showExtend">
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
export default {
  name: 'HomeList',
  props: {
    genre: {
      type: String,
      default: 'Default'
    },
    flex: {
      type: Number,
      default: 3
    },
    showExtend: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loading: false,
      cards: [
        {
          title: '爱尔兰人',
          src: require('../assets/movie/1.jpg'),
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }, {
          title: '爱尔兰人',
          src: require('../assets/movie/1.jpg'),
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }, {
          title: '爱尔兰人',
          src: require('../assets/movie/1.jpg'),
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }, {
          title: '爱尔兰人',
          src: require('../assets/movie/1.jpg'),
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }, {
          title: '爱尔兰人',
          src: require('../assets/movie/1.jpg'),
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }, {
          title: '爱尔兰人',
          src: require('../assets/movie/1.jpg'),
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }, {
          title: '爱尔兰人',
          src: require('../assets/movie/1.jpg'),
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }, {
          title: '爱尔兰人',
          src: require('../assets/movie/1.jpg'),
          date: '2000',
          genre: '喜剧',
          origin: '中国',
          douban_rate: '7.7',
          IMDb_rate: '7.7'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
