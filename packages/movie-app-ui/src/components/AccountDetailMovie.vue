<template>
  <v-page
    :title="$route.query.title"
  >
    <!--v-if will cause ids not work when there's id-->
    <movie-list
      v-show="ids.length !== 0"
      :ids="ids"
    />
    <p
      v-if="ids.length === 0"
      class="mx-4 title"
    >
      {{ $t('noMovies') }}
    </p>
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
  data () {
    return {
      ids: []
    }
  },
  mounted () {
    const typeSwitcher = {
      [this.$t('myList')]: 'list',
      [this.$t('myLike')]: 'like',
      [this.$t('watched')]: 'watched'
    }
    const type = typeSwitcher[this.$route.query.title]
    this.ids = this.$store.state.userStore[type]
  }
}
</script>

<style scoped>

</style>
