<template>
  <v-sheet
    width="100%"
    class="fill-height"
  >
    <home-screen :detail="detail"/>
    <component v-bind:is="responsiveComponent" genre="最新"></component>
    <component v-bind:is="responsiveComponent" genre="动作"></component>
  </v-sheet>
</template>

<script>
import HomeScreen from '../components/HomeScreen'
import MovieScroll from '../components/global/MovieScroll'
import MovieList from '../components/global/MovieList'
import storeMap from '../mixins/storeMap'
import { getMovie } from '../api/movie'

export default {
  name: 'Home',
  mixins: [storeMap],
  components: {
    'home-screen': HomeScreen,
    'movie-scroll': MovieScroll,
    'movie-list': MovieList
  },
  data () {
    return {
      detail: undefined
    }
  },
  computed: {
    responsiveComponent () {
      return this.$vuetify.breakpoint.smAndDown ? 'movie-scroll' : 'movie-list'
    }
  },
  mounted () {
    getMovie(1).then(res => {
      this.detail = res
    }).catch(err => {
      console.log(err)
      this.callSnack({ text: err })
    })
  }
}
</script>

<style>

</style>
