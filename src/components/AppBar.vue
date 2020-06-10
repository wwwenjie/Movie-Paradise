<template>
  <v-app-bar
    app
    dark
    dense
    flat
    clipped-left
    color="red"
  >
    <v-app-bar-nav-icon @click.stop="onClickDrawer" />
    <v-toolbar-title
      class="pl-0"
      @click="goHomePage"
    >
      <v-icon
        large
        class="ml-4"
      >
        mdi-youtube
      </v-icon>
      <span class="title">{{ $t('appName') }}</span>
    </v-toolbar-title>
    <v-spacer />
    <v-row
      align="center"
      style="max-width: 650px"
    >
      <v-autocomplete
        v-if="this.$vuetify.breakpoint.lgAndUp"
        :loading="loading"
        :items="titleList"
        :search-input.sync="title"
        :placeholder="$t('searchText')"
        prepend-inner-icon="mdi-magnify"
        hide-details
        clearable
        @change="goToDetail"
      >
        <template slot="no-data">
          <v-list-item>{{ $t('searchNotFound') }}</v-list-item>
        </template>
      </v-autocomplete>
    </v-row>
    <v-spacer />
    <v-btn
      outlined
      @click="onAccount"
    >
      {{ $store.state.token ? $store.state.userName : $t('notLogged') }}
    </v-btn>
  </v-app-bar>
</template>

<script>
import { getMovieByType, searchByTitle } from '../api/movie'
import Message from '../utils/message'

export default {
  name: 'AppBar',
  props: {
    drawer: {
      type: Boolean
    }
  },
  data () {
    return {
      loading: false,
      title: undefined,
      titleList: [],
      movies: [],
      timeout: undefined
    }
  },
  watch: {
    // live search
    async title (title) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(async () => {
        if (!title) {
          return
        }
        this.loading = true
        this.movies = await searchByTitle(title)
        this.titleList = this.movies.map(movie => {
          return movie.title
        })
        this.loading = false
      }, this.timeout)
    }
  },
  async mounted () {
    // load newest movies in titleList
    this.movies = await getMovieByType('newest')
    this.titleList = this.movies.map(movie => {
      return movie.title
    })
  },
  methods: {
    onClickDrawer () {
      this.$emit('update:drawer', !this.drawer)
    },
    goHomePage () {
      // handle NavigationDuplicated
      this.$router.push({ path: '/' }).catch(err => err)
    },
    goToDetail () {
      // timeout to wait title update, or it will get the value before
      setTimeout(() => {
        this.movies.map(movie => {
          if (this.title === movie.title) {
            this.$router.push({ path: `/movie/${movie.path}` })
          }
        })
      }, 100)
    },
    onAccount () {
      if (this.$store.state.token) {
        // todo: account page
        Message.info('Account page is under developing')
      } else {
        this.$store.commit('SET_POP_ACCOUNT', true)
      }
    }
  }
}
</script>

<style scoped>

</style>
