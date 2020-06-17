<template>
  <v-app
    id="inspire"
  >
    <!--global components start-->
    <the-loading v-if="loading" />
    <the-message v-if="messageCon.show" />
    <the-account v-if="popAccount" />
    <!--global components end-->
    <app-navigation-drawer
      v-if="this.$vuetify.breakpoint.mdAndUp"
      :drawer.sync="drawer"
    />
    <app-bar
      v-if="this.$vuetify.breakpoint.mdAndUp"
      :drawer.sync="drawer"
    />
    <v-main>
      <v-container
        fluid
        class="fill-height pa-0"
      >
        <v-fade-transition>
          <keep-alive
            :exclude="/^AccountDetail/"
            :max="10"
          >
            <router-view />
          </keep-alive>
        </v-fade-transition>
      </v-container>
    </v-main>
    <app-navigation-bottom
      v-if="this.$vuetify.breakpoint.mdAndDown"
    />
  </v-app>
</template>

<script>
import AppNavigationDrawer from './components/AppNavigationDrawer'
import AppNavigationBottom from './components/AppNavigationBottom'
import AppBar from './components/AppBar'
import TheMessage from './components/global/TheMessage'
import TheLoading from './components/global/TheLoading'
import TheAccount from './components/global/TheAccount'
import storeMap from './mixins/storeMap'
import Message from './utils/message'
import { getGenres } from './api/genre'

export default {
  name: 'MovieParadise',
  components: {
    'app-navigation-drawer': AppNavigationDrawer,
    'app-navigation-bottom': AppNavigationBottom,
    'app-bar': AppBar,
    'the-loading': TheLoading,
    'the-message': TheMessage,
    'the-account': TheAccount
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
            Message.info(this.$t('thanks'), 1500)
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
