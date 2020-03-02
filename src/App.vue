<template>
  <v-app
    id="inspire"
  >
    <app-navigation-drawer
      v-if="this.$vuetify.breakpoint.mdAndUp&this.isHome"
      :drawer.sync="drawer"
    />
    <app-bar
      v-if="this.$vuetify.breakpoint.mdAndUp&this.isHome"
      :drawer.sync="drawer"
    />
    <v-content>
      <v-container
        fluid
        class="fill-height pa-0">
        <v-fade-transition>
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>
    <app-navigation-bottom
      v-if="this.$vuetify.breakpoint.mdAndDown&this.isHome"
    />
  </v-app>
</template>

<script>
import AppNavigationDrawer from './components/AppNavigationDrawer'
import AppNavigationBottom from './components/AppNavigationBottom'
import AppBar from './components/AppBar'
import storeMap from './mixins/storeMap'

export default {
  name: 'Movie_Paradise',
  mixins: [storeMap],
  components: {
    'app-navigation-drawer': AppNavigationDrawer,
    'app-navigation-bottom': AppNavigationBottom,
    'app-bar': AppBar
  },
  props: {
    source: String
  },

  data () {
    return {
      drawer: null
    }
  },

  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>
