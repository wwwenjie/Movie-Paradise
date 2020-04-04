<template>
  <v-app
    id="inspire"
  >
    <!--global snackbar-->
    <snackbar :show.sync="snackCon.show" :snack-con="snackCon"/>
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
            <router-view></router-view>
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

export default {
  name: 'Movie_Paradise',
  mixins: [storeMap],
  components: {
    'app-navigation-drawer': AppNavigationDrawer,
    'app-navigation-bottom': AppNavigationBottom,
    'app-bar': AppBar,
    'snackbar': Snackbar
  },

  data () {
    return {
      drawer: undefined
    }
  },

  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>

<style>
  html{
    filter: grayscale(100%);
  }
</style>
