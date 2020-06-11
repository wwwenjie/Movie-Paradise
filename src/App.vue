<template>
  <v-app
    id="inspire"
  >
    <!--global components start-->
    <loading
      v-if="loadingCon.loading"
      :loading="loadingCon.loading"
      :timeout="loadingCon.timeout"
    />
    <snackbar
      v-if="snackCon.show"
      :show="snackCon.show"
      :snack-con="snackCon"
    />
    <account
      v-if="popAccount"
      :dialog="popAccount"
    />
    <!--global components end-->
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
import Account from './views/Account'
import { getGenres } from './api/genre'
import Loading from './components/global/Loading'

export default {
  name: 'MovieParadise',
  components: {
    'app-navigation-drawer': AppNavigationDrawer,
    'app-navigation-bottom': AppNavigationBottom,
    'app-bar': AppBar,
    'loading': Loading,
    'snackbar': Snackbar,
    'account': Account
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
        text: this.$t('UIPMessage'),
        confirmText: this.$t('sure'),
        declineText: this.$t('deny'),
        callbackConfirm: () => {
          this.setAllowImprove({ allow: true, asked: true })
          setTimeout(() => {
            Message.call({
              text: this.$t('thanks'),
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
