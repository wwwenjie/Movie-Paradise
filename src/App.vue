<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-subheader class="mt-4 grey--text text--darken-1">{{$t('genre.genre')}}</v-subheader>
      <v-list dense>
        <v-list-item
          v-for="item in genre"
          :key="item.text"
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
        >
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">{{$t('more')}}</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">{{$t('setting')}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      dense
      flat
      clipped-left
      :hide-on-scroll="!isDesktop"
      :color="isDesktop?'red':'transparent'"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-icon class="mx-4 hidden-xs-only">mdi-youtube</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">{{$t('appName')}}</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-row
        align="center"
        style="max-width: 650px"
      >
        <v-text-field
          :append-icon-cb="() => {}"
          :placeholder="$t('search')"
          single-line
          append-icon="mdi-magnify"
          color="white"
          hide-details
        />
      </v-row>
    </v-app-bar>

    <v-content :class="isDesktop?'':'pt-0'">
      <v-container
        fluid
        class="fill-height pa-0">
        <app-screen/>
        <app-scroll/>
        <app-scroll/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppScreen from './components/AppScreen'
import AppScroll from './components/AppScroll'

export default {
  name: 'Movie_Paradise',
  components: {
    'app-screen': AppScreen,
    'app-scroll': AppScroll
  },
  props: {
    source: String
  },
  // if use arrow function to return the data object 'this' isn't bound correctly, so unable to use i18n
  data: function () {
    return {
      drawer: null,
      genre: [
        { icon: '', text: this.$i18n.t('genre.action') },
        { icon: '', text: this.$i18n.t('genre.comedy') },
        { icon: '', text: this.$i18n.t('genre.sci-fi') },
        { icon: '', text: this.$i18n.t('genre.romance') },
        { icon: '', text: this.$i18n.t('genre.mystery') }
      ]
    }
  },

  computed: {
    isDesktop () {
      return this.onResize() === 'lg' || this.onResize() === 'xl'
    }
  },

  methods: {
    onResize () {
      return this.$vuetify.breakpoint.name
    }
  },

  created () {
    this.$vuetify.theme.dark = true
  },

  mounted () {
    window.addEventListener('resize', this.onResize, { passive: true })
  },

  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  }
}
</script>
