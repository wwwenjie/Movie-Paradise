<template>
  <v-app
    v-resize="onResize"
    id="inspire"
  >
    <app-navigation-drawer v-if="isDesktop" :drawer.sync="drawer"/>
    <app-bar
      v-if="isDesktop"
      :drawer.sync="drawer"
      :isDesktop="isDesktop"
    />
    <v-content :class="isDesktop?'':'pt-0'">
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

  computed: {
    isDesktop () {
      return this.onResize() === 'lg' || this.onResize() === 'xl'
    }
  },

  created () {
    this.$vuetify.theme.dark = true
  },

  methods: {
    onResize () {
      return this.$vuetify.breakpoint.name
    }
  }
}
</script>
