<template>
  <v-sheet
    width="100%"
    class="fill-height"
  >
    <component :is="responsiveBillboard" />
    <component
      :is="responsiveMovie"
      :title="$t('popular')"
      type="newest"
    />
    <component
      :is="responsiveMovie"
      :title="$t('upcoming')"
      type="coming"
    />
    <component
      :is="responsiveMovie"
      v-for="genre in genres"
      :key="genre.name"
      :title="locale === 'zh-CN' ? genre.name : genre.name_en"
      :genre="genre.name"
    />
    <p
      ref="load"
      class="display-1 justify-center d-flex"
    >
      Loading...
    </p>
    <v-progress-linear
      indeterminate
      color="red"
    />
  </v-sheet>
</template>

<script>
import HomeScreen from '../components/HomeScreen'
import HomeVideo from '../components/HomeVideo'
import MovieScroll from '../components/global/MovieScroll'
import MovieList from '../components/global/MovieList'
import storeMap from '../mixins/storeMap'

export default {
  name: 'Home',
  components: {
    'home-video': HomeVideo,
    'home-screen': HomeScreen,
    'movie-scroll': MovieScroll,
    'movie-list': MovieList
  },
  mixins: [storeMap],
  data () {
    return {
      genres: []
    }
  },
  computed: {
    responsiveMovie () {
      return this.$vuetify.breakpoint.xs ? 'movie-scroll' : 'movie-list'
    },
    responsiveBillboard () {
      return this.$vuetify.breakpoint.xs ? 'home-screen' : 'home-video'
    }
  },
  watch: {
    genreStore: {
      handler (genreStore) {
        this.genres = genreStore.slice(0, 2)
      },
      immediate: true
    }
  },
  mounted () {
    const defaultAppend = 2
    const intersectionObserver = new IntersectionObserver(
      async entries => {
        if (entries[0].intersectionRatio <= 0) return
        this.genres = this.genres.concat(this.genreStore.slice(this.genres.length, this.genres.length + defaultAppend))
      })
    intersectionObserver.observe(this.$refs.load)
  }
}
</script>

<style>

</style>
