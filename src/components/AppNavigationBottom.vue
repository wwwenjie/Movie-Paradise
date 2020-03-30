<template>
  <v-bottom-navigation
    app
    grow
  >
    <v-btn
      v-for="item in items"
      :key="item.title"
      height="inherit"
      @click="goTo(item.title.toLocaleLowerCase())"
    >
      <span>{{item.title}}</span>
      <v-icon>{{item.icon}}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'AppNavigationBottom',
  data () {
    return {
      items: [
        { title: 'Home', icon: 'mdi-home' },
        { title: 'Search', icon: 'mdi-movie-search' },
        { title: 'Settings', icon: 'mdi-settings' }
      ]
    }
  },
  methods: {
    goTo (routePath) {
      this.$router.push({ path: `/${routePath}` })
    }
  }
}
</script>

<style scoped>

</style>
