<template>
  <v-bottom-navigation
    app
    grow
  >
    <v-btn
      v-for="(item,index) in items"
      :key="index"
      height="inherit"
      @click="goTo(index)"
    >
      <span>{{ item.title }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'AppNavigationBottom',
  computed: {
    items () {
      return [
        { title: this.$t('home'), icon: 'mdi-home' },
        { title: this.$t('search'), icon: 'mdi-movie-search' },
        { title: this.$t('settings'), icon: 'mdi-settings' }
      ]
    }
  },
  methods: {
    goTo (index) {
      const routes = ['home', 'search', 'settings']
      this.$router.push({ path: `/${routes[index]}` })
    }
  }
}
</script>

<style scoped>

</style>
