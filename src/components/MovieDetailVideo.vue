<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="$vuetify.breakpoint.smAndDown"
    max-width="920"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :light="light"
        :loading="btnLoading"
        depressed
        :disabled="emptyTrailers"
        width="100%"
        :class="[light ? 'font-weight-bold mb-2' : 'mt-4 red white--text']"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>
          mdi-play
        </v-icon>
        {{ emptyTrailers ? $t('noTrailer') : $t('trailer') }}
        <template v-slot:loader>
          <span class="custom-loader">
            <v-icon light>mdi-cached</v-icon>
          </span>
        </template>
      </v-btn>
    </template>
    <v-page
      :title="$vuetify.breakpoint.smAndDown ? $t('trailer') : null"
      :back-function="()=>{
        // eslint-disable-next-line vue/this-in-template
        this.dialog = false
      }"
    >
      <v-card v-if="dialog">
        <v-card-title class="headline">
          {{ trailer.name }}
        </v-card-title>

        <v-card-text>
          <video
            ref="video"
            controls
            autoplay
            style="width: 100%"
          >
            <source
              :src="trailer.play_url"
              type="video/mp4"
            >
            {{ $t('noVideoSupport') }}
          </video>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-select
            ref="select"
            :value="trailer.name"
            :items="trailers.map(trailer=>{
              return trailer.name
            })"
            :style="{
              'max-width': $vuetify.breakpoint.smAndDown ?
                this.$vuetify.breakpoint.width*0.7 + 'px' : '500px'
            }"
            hide-details
            solo
            @input="changeVideo($event)"
          />
          <v-spacer />
          <v-btn
            text
            @click="dialog = false"
          >
            {{ $t('close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-page>
  </v-dialog>
</template>

<script>
import VPage from './global/VPage'

export default {
  name: 'MovieDetailVideo',
  components: {
    'v-page': VPage
  },
  props: {
    light: {
      type: Boolean,
      default: false
    },
    trailers: {
      type: Array,
      default: () => ([{
        cover_url: undefined,
        m: undefined,
        name: undefined,
        play_url: undefined,
        _id: undefined
      }])
    },
    btnLoading: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      dialog: false,
      trailer: {
        cover_url: undefined,
        m: undefined,
        name: undefined,
        play_url: undefined,
        _id: undefined
      }
    }
  },
  computed: {
    emptyTrailers: function () {
      return this.trailers === null || (Array.isArray(this.trailers) && this.trailers.length === 0)
    }
  },
  watch: {
    trailers: {
      handler: function () {
        if (this.trailers) {
          this.trailer = this.trailers[0]
        }
      },
      immediate: true
    }
  },
  methods: {
    changeVideo (value) {
      this.trailer = this.trailers.filter(trailer => {
        return trailer.name === value
      }).shift()
      this.$refs.video.load()
    }
  }
}
</script>

<style scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
