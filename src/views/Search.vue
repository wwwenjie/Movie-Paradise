<template>
  <!--for pad and down only-->
  <v-sheet
    width="100%"
    class="fill-height"
  >
    <v-text-field
      ref="input"
      prepend-inner-icon="mdi-magnify"
      class="pa-2"
      :label="$t('search')"
      :loading="loading"
      hide-details
      clearable
      outlined
      dense
      @focus="onFocus"
      @change="search"
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
    <movie-list genre="Result" />
  </v-sheet>
</template>

<script>
import MovieList from '../components/global/MovieList'

export default {
  name: 'Search',
  components: {
    'movie-list': MovieList
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    onFocus () {
      this.loading = false
    },
    search () {
      this.$refs.input.blur()
      this.loading = true
      // searching
    }
  }
}
</script>

<style scoped>

</style>
