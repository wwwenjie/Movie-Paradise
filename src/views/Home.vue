<template>
  <v-sheet
    width="100%"
    class="fill-height"
  >
    <home-screen/>
    <component v-bind:is="responsiveComponent" genre="最新"></component>
    <component v-bind:is="responsiveComponent" genre="动作"></component>
  </v-sheet>
</template>

<script>
import HomeScreen from '../components/HomeScreen'
import MovieScroll from '../components/global/MovieScroll'
import MovieList from '../components/global/MovieList'

export default {
  name: 'Home',
  components: {
    'home-screen': HomeScreen,
    'movie-scroll': MovieScroll,
    'movie-list': MovieList
  },
  computed: {
    responsiveComponent () {
      return this.$vuetify.breakpoint.smAndDown ? 'movie-scroll' : 'movie-list'
    }
  }
}
</script>

<style>

</style>
