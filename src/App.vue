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
      clipped-left
      color="red"
      dense
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

    <v-content>
      <v-container class="fill-height">
        <v-row
          justify="center"
          align="center"
        >
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="source"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  href="https://codepen.io/johnjleider/pen/aezMOO"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-codepen</v-icon>
                </v-btn>
              </template>
              <span>Codepen</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Movie_Paradise',
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
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>
