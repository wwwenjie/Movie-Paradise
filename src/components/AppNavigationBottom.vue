<template>
  <v-bottom-navigation
    v-model="bottomNav"
    app
    grow
  >
    <v-btn
      value="recent"
      height="inherit"
    >
      <span>Recent</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn
      value="favorites"
      height="inherit"
    >
      <span>Favorites</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn
      value="nearby"
      height="inherit"
    >
      <span>Nearby</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'AppNavigationBottom',
  data () {
    return {
      bottomNav: 'recent'
    }
  }
}
</script>

<style scoped>

</style>
