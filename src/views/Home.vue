<template>
  <v-sheet
    width="100%"
    class="fill-height"
  >
    <component v-bind:is="responsiveBillboard"></component>
    <component v-bind:is="responsiveMovie" genre="最新"></component>
    <component v-bind:is="responsiveMovie" genre="动作"></component>
  </v-sheet>
</template>

<script>
import HomeScreen from '../components/HomeScreen'
import HomeVideo from '../components/HomeVideo'
import MovieScroll from '../components/global/MovieScroll'
import MovieList from '../components/global/MovieList'

export default {
  name: 'Home',
  components: {
    'home-video': HomeVideo,
    'home-screen': HomeScreen,
    'movie-scroll': MovieScroll,
    'movie-list': MovieList
  },
  computed: {
    responsiveMovie () {
      return this.$vuetify.breakpoint.xs ? 'movie-scroll' : 'movie-list'
    },
    responsiveBillboard () {
      return this.$vuetify.breakpoint.xs ? 'home-screen' : 'home-video'
    }
  }
}
</script>

<style>

</style>
