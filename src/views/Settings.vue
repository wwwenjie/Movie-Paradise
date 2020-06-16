<template>
  <v-sheet
    width="100%"
    class="fill-height"
  >
    <v-toolbar class="hidden-md-and-up">
      <v-toolbar-title>{{ $t('settings') }}</v-toolbar-title>
    </v-toolbar>
    <v-list>
      <v-list-item @click="onAccount">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('account') }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          {{ token ? userStore.name : $t('notLogged') }}
        </v-list-item-action>
      </v-list-item>

      <v-list-item @click="switchDarkMode">
        <v-list-item-icon>
          <v-icon>mdi-circle-half-full</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('darkTheme') }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-switch :input-value="this.$vuetify.theme.dark" />
        </v-list-item-action>
      </v-list-item>

      <v-list-item @click="dialogLanguage=!dialogLanguage">
        <v-list-item-icon>
          <v-icon>mdi-translate</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('language') }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <span class="my-auto">{{ this.$i18n.locale }}</span>
          <v-dialog
            v-model="dialogLanguage"
            max-width="300px"
          >
            <v-card>
              <v-card-title>{{ $t('selectLanguage') }}</v-card-title>
              <v-divider />
              <v-card-text class="pa-0">
                <v-list>
                  <v-list-item
                    v-for="item in this.$i18n.availableLocales"
                    :key="item"
                    @click="switchLocale(item)"
                  >
                    <v-list-item-content class="pl-2">
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-list-item-action>
      </v-list-item>

      <v-list-item @click="clearCache">
        <v-list-item-icon>
          <v-icon>mdi-cached</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('clearCache') }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            outlined
            small
          >
            {{ $t('clear') }}
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <account />
  </v-sheet>
</template>

<script>
import storeMap from '../mixins/storeMap'
import Message from '../utils/message'

export default {
  name: 'Setting',
  mixins: [storeMap],
  data: () => ({
    dialogLanguage: false
  }),
  methods: {
    onAccount () {
      if (this.token) {
        this.$router.push({ path: '/account' })
      } else {
        this.setPopAccount(true)
      }
    },
    switchDarkMode () {
      this.$vuetify.theme.dark = !this.darkMode
      this.setDarkMode(this.$vuetify.theme.dark)
    },
    switchLocale (locale) {
      this.$i18n.locale = locale
      this.setLocate(locale)
      setTimeout(() => {
        this.dialogLanguage = false
        Message.info(this.$t('langChangeInfo'))
      }, 100)
    },
    clearCache () {
      this.$store.commit('CLEAR_MOVIE_CACHE')
      Message.success()
    }
  }
}
</script>

<style scoped>

</style>
