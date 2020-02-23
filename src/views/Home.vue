<template>
  <div class="app-home">
    <home-screen/>
    <home-scroll/>
    <home-scroll/>
  </div>
</template>

<script>
import HomeScreen from '../components/HomeScreen'
import HomeScroll from '../components/HomeScroll'

export default {
  name: 'Home',
  components: {
    'home-screen': HomeScreen,
    'home-scroll': HomeScroll
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.commit('SET_IS_HOME', true)
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('SET_IS_HOME', false)
    next()
  }
}
</script>

<style>
  .app-home {
    width: 100%;
  }
</style>
