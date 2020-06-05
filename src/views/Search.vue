<template>
  <!--for mobile only-->
  <v-sheet
    width="100%"
    class="fill-height"
  >
    <v-text-field
      ref="input"
      v-model="keyword"
      :label="$t('search')"
      :loading="loading"
      hide-details
      clearable
      outlined
      dense
      prepend-inner-icon="mdi-magnify"
      class="pa-2"
      @focus="onFocus"
      @input="debounce(search,1000)"
    >
      <template v-slot:progress>
        <v-progress-linear
          :active="loading"
          :indeterminate="loading"
          class="mt-n1"
          absolute
          rounded
        />
      </template>
    </v-text-field>
    <div>
      <p class="ml-2 mb-0 title">
        {{ promptText }}
      </p>
    </div>
    <movie-list
      v-show="movies.length!==0"
      :movie-array="movies"
    />
  </v-sheet>
</template>

<script>
import MovieList from '../components/global/MovieList'
import { searchByTitle } from '../api/movie'

export default {
  name: 'Search',
  components: {
    'movie-list': MovieList
  },
  data () {
    return {
      loading: false,
      keyword: '',
      movies: [],
      promptText: this.$t('searchText'),
      timeout: undefined
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
    this.keyword = ''
    this.movies = []
    this.promptText = this.$t('searchText')
  },
  methods: {
    onFocus () {
      this.loading = false
    },
    async search () {
      if (this.keyword.length === 0) {
        this.movies = []
        this.promptText = this.$t('searchText')
        return
      }
      this.loading = true
      this.movies = await searchByTitle(this.keyword)
      this.loading = false
      this.promptText = this.movies.length === 0 ? this.$t('searchNotFound') : this.$t('searchResult', { count: this.movies.length })
    },
    debounce (func, timeout) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(function () {
        func.apply(this)
      }, timeout)
    }
  }
}
</script>

<style scoped>

</style>
