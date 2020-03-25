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
import HomeScroll from '../components/HomeScroll'
import HomeList from '../components/HomeList'

export default {
  name: 'Home',
  components: {
    'home-screen': HomeScreen,
    'home-scroll': HomeScroll,
    'home-list': HomeList
  },
  computed: {
    responsiveComponent () {
      return this.$vuetify.breakpoint.smAndDown ? 'home-scroll' : 'home-list'
    }
  }
}
</script>

<style>

</style>
