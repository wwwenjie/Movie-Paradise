<template>
  <v-img
    width="100%"
    max-height="80vh"
    :src="posterUrl"
    alt="home"
    gradient="to bottom,rgba(64, 64, 64, 0) 70%,rgba(30, 30, 30, 100) 100%"
  >
  </v-img>
</template>

<script>
export default {
  name: 'HomeScreen',
  data () {
    return {
      posterUrl: '/static/test.jpg'
    }
  }
}
</script>

<style scoped>

</style>
