<template>
  <div>
    <app-screen/>
    <app-scroll/>
    <app-scroll/>
  </div>
</template>

<script>
import AppScreen from '../components/AppScreen'
import AppScroll from '../components/AppScroll'

export default {
  name: 'Home',
  components: {
    'app-screen': AppScreen,
    'app-scroll': AppScroll
  }
}
</script>
