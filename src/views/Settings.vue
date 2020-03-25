<template>
  <v-sheet
    class="fill-height"
    width="100%"
  >
    <v-toolbar class="hidden-md-and-up">
      <v-toolbar-title>Settings</v-toolbar-title>
    </v-toolbar>
    <v-list>
      <v-list-item @click="switchDarkMode">
        <v-list-item-icon>
          <v-icon>mdi-circle-half-full</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Dark Mode</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-switch :input-value="this.$vuetify.theme.dark"/>
        </v-list-item-action>
      </v-list-item>

      <v-list-item @click="switchLocale">
        <v-list-item-icon>
          <v-icon>mdi-translate</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{$t('language')}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <!--add meaningless variables to increase user experience-->
          <!--it supposed to drop a menu-->
          <v-switch :input-value="locale"/>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
export default {
  name: 'Setting',
  data: () => ({
    locale: false
  }),
  methods: {
    switchDarkMode () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    switchLocale () {
      this.locale = !this.locale
      this.$i18n.locale === 'zh-CN' ? this.$i18n.locale = 'en-US' : this.$i18n.locale = 'zh-CN'
    }
  }
}
</script>

<style scoped>

</style>
