<template>
  <v-page
    :title="title"
  >
    <movie-list />
  </v-page>
</template>
<script>
import VPage from './global/VPage'
import MovieList from './global/MovieList'

export default {
  name: 'AccountDetailList',
  components: {
    'v-page': VPage,
    'movie-list': MovieList
  },
  props: {
    title: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style scoped>

</style>
