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
  }
}
</script>

<style>
.app-home{
  width: 100%;
}
</style>
