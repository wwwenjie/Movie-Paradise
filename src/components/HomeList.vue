<template>
  <v-card
    class="mx-auto"
    width="100%"
    tile
  >
    <p class="title ml-3 mb-0">{{category}}</p>
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
              <v-card-title v-if="showExtend" v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions v-if="showExtend">
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
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
    category: {
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
        { title: '爱尔兰人', src: require('../assets/movie/1.jpg'), date: '2000' },
        { title: '爱尔兰人', src: require('../assets/movie/1.jpg'), date: '2000' },
        { title: '爱尔兰人', src: require('../assets/movie/1.jpg'), date: '2000' },
        { title: '爱尔兰人', src: require('../assets/movie/1.jpg'), date: '2000' },
        { title: '爱尔兰人', src: require('../assets/movie/1.jpg'), date: '2000' },
        { title: '爱尔兰人', src: require('../assets/movie/1.jpg'), date: '2000' },
        { title: '爱尔兰人', src: require('../assets/movie/1.jpg'), date: '2000' },
        { title: '爱尔兰人', src: require('../assets/movie/1.jpg'), date: '2000' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
