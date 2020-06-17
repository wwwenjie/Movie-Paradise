<template>
  <v-page
    :title="$t('about')"
  >
    <v-list>
      <v-list-item>
        <!--logo-->
        <v-avatar
          color="grey"
          size="80"
          class="my-4 mx-auto"
        />
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>{{ $t('version') }}</v-list-item-title>
        </v-list-item-content>
        <!-- https://semver.org/ -->
        <v-list-item-action>{{ version }}</v-list-item-action>
      </v-list-item>

      <v-subheader>{{ $t('intro') }}</v-subheader>
      <p class="px-4 text-justify subtitle-2">
        {{ $t('introText') }}
      </p>

      <v-list-item @click="github">
        <v-list-item-content>
          <v-list-item-title>Github</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            icon
            small
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-footer
      absolute
      padless
      color="transparent"
    >
      <v-col
        class="text-center grey--text"
        cols="12"
      >
        Powered by King Network
      </v-col>
    </v-footer>
  </v-page>
</template>

<script>
import VPage from '../components/global/VPage'
export default {
  name: 'About',
  components: {
    'v-page': VPage
  },
  data () {
    return {
      version: undefined
    }
  },
  mounted () {
    this.version = process.env.VUE_APP_VERSION
  },
  methods: {
    github () {
      window.open('https://github.com/wwwenjie/Movie-Paradise', '_blank')
    }
  }
}
</script>

<style scoped>

</style>
