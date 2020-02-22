<template>
  <v-app
    id="inspire"
  >
    <app-navigation-drawer :drawer.sync="drawer"/>
    <app-bar
      :drawer.sync="drawer"
    />
    <v-content :class="this.$vuetify.breakpoint.mdAndUp?'':'pt-0'">
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

export default {
  name: 'Movie_Paradise',
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
