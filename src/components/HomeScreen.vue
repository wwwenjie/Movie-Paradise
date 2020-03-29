<template>
  <v-img
    :src="poster"
    :contain="this.$vuetify.breakpoint.mdAndUp"
    width="100%"
    max-height="80vh"
    alt="poster"
    lazy-src="/static/test.jpg"
    gradient="to bottom,rgba(64, 64, 64, 0) 70%,rgba(30, 30, 30, 100) 100%"
  >
    <template v-slot:placeholder>
      <v-row
        class="fill-height"
        align="center"
        justify="center"
      >
        <v-progress-circular indeterminate></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  name: 'HomeScreen',
  props: {
    poster: {
      type: String,
      default: '/static/test.jpg'
    }
  }
}
</script>

<style scoped>

</style>
