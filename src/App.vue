<template>
  <v-app
    id="inspire"
  >
    <app-navigation-drawer
      :drawer.sync="drawer"
      :class="{'d-none':this.$vuetify.breakpoint.mdAndDown&!this.isHome}"
    />
    <app-bar
      :drawer.sync="drawer"
      :class="{'d-none':this.$vuetify.breakpoint.mdAndDown&!this.isHome}"
    />
    <v-content
      :class="{'pt-0':this.$vuetify.breakpoint.mdAndDown&this.isHome}"
    >
      <v-container
        fluid
        class="fill-height pa-0">
        <v-fade-transition>
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppNavigationDrawer from './components/AppNavigationDrawer'
import AppBar from './components/AppBar'
import storeMap from './mixins/storeMap'

export default {
  name: 'Movie_Paradise',
  mixins: [storeMap],
  components: {
    'app-navigation-drawer': AppNavigationDrawer,
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
