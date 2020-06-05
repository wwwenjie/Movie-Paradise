<template>
  <v-app
    id="inspire"
  >
    <!--global snackbar-->
    <snackbar
      :show="snackCon.show"
      :snack-con="snackCon"
    />
    <app-navigation-drawer
      v-if="this.$vuetify.breakpoint.mdAndUp"
      :drawer.sync="drawer"
    />
    <app-bar
      v-if="this.$vuetify.breakpoint.mdAndUp"
      :drawer.sync="drawer"
    />
    <v-content>
      <v-container
        fluid
        class="fill-height pa-0"
      >
        <v-fade-transition>
          <keep-alive>
            <router-view />
          </keep-alive>
        </v-fade-transition>
      </v-container>
    </v-content>
    <app-navigation-bottom
      v-if="this.$vuetify.breakpoint.mdAndDown"
    />
  </v-app>
</template>

<script>
import AppNavigationDrawer from './components/AppNavigationDrawer'
import AppNavigationBottom from './components/AppNavigationBottom'
import AppBar from './components/AppBar'
import Snackbar from './components/global/Snackbar'
import storeMap from './mixins/storeMap'
import Message from './utils/message'
import { getGenres } from './api/genre'

export default {
  name: 'MovieParadise',
  components: {
    'app-navigation-drawer': AppNavigationDrawer,
    'app-navigation-bottom': AppNavigationBottom,
    'app-bar': AppBar,
    'snackbar': Snackbar
  },
  mixins: [storeMap],

  data () {
    return {
      drawer: null
    }
  },

  async created () {
    this.$vuetify.theme.dark = this.darkMode
    if (!this.allowImprove.asked) {
      Message.call({
        text: 'Allow us to create additional requests to better our website',
        confirmText: 'SURE',
        declineText: 'DENY',
        callbackConfirm: () => {
          this.setAllowImprove({ allow: true, asked: true })
          setTimeout(() => {
            Message.call({
              text: 'Thank You!',
              timeout: 1500
            }, 1000)
          })
        },
        callbackDecline: () => {
          this.setAllowImprove({ allow: false, asked: true })
        }
      })
    }
    if (new Date() - 86400000 > this.$store.state.lastCacheDate) {
      this.$store.commit('CLEAR_MOVIE_CACHE')
    }
    if (this.genreStore.length === 0) {
      this.setGenreStore(await getGenres(100))
    }
  }
}
</script>
