<template>
  <div>
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
