<template>
  <v-dialog
    v-model="dialog"
    max-width="720"
    scrollable
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        x-large
        class="px-0"
        v-bind="attrs"
        v-on="on"
      >
        <div>
          <v-icon class="d-flex">
            mdi-play-circle-outline
          </v-icon>
          <span class="caption grey--text">
            {{ $t('playLinks') }}
          </span>
        </div>
      </v-btn>
    </template>

    <v-card
      v-if="loading"
      color="red"
    >
      <v-card-text>
        <p class="mt-2 mb-0 white--text">
          {{ $t('loading') }}
        </p>
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        />
      </v-card-text>
    </v-card>

    <v-card v-if="dialog && !loading">
      <v-card-title
        class="headline"
      >
        {{ $t('resources',{ title: movieTitle }) }}
      </v-card-title>

      <v-card-text>
        <p
          v-if="playLinks.length === 0"
          class="subtitle-1"
        >
          {{ $t('noResources') }}
        </p>
        <v-row
          v-for="(link, index) in onlyOnline ? playLinks.filter(link => {
            return link.type==='online'
          }) : playLinks"
          :key="index"
        >
          <v-col cols="12">
            <span class="red--text">
              {{ link.site ? link.site : $t('network') }}
            </span>
            <span>
              <a
                v-if="link.type==='online'"
                :href="link.url"
                target="_blank"
                class="text-decoration-none"
              >
                <v-icon small>mdi-play-circle-outline</v-icon>
                {{ link.title }}
              </a>
              <a
                v-else
                @click="setShow(index)"
              >
                <v-icon small>mdi-download</v-icon>
                {{ link.title }}
              </a>
              <v-icon
                v-if="link.meta.pay"
                small
                color="yellow"
              >mdi-cash-usd-outline</v-icon>
            </span>
            <span v-if="link.meta.du">
              {{ link.meta.du }}
            </span>
            <span v-if="link.meta.length">
              {{ (link.meta.length/1073741824).toFixed(2) + 'GB' }}
            </span>
            <v-card
              v-if="link.show"
            >
              <v-card-text>
                {{ link.url }}
                <v-btn
                  text
                  small
                  @click="copy(link.url)"
                >
                  copy
                </v-btn>
                <v-btn
                  text
                  small
                  :href="`https://www.baidu.com/s?wd=${link.url}`"
                >
                  Baidu
                </v-btn>
                <v-btn
                  text
                  small
                  :href="`https://www.google.com/search?q=${link.url}`"
                >
                  Google
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-checkbox
          v-model="onlyOnline"
          hide-details
          :label="$t('onlyOnline')"
          class="mt-0 pt-0 ml-2"
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
  </v-dialog>
</template>

<script>
import { getPlayLinks } from '../api/playlink'
import { undefinedPlayLink } from '../utils'
import Message from '../utils/message'

export default {
  name: 'MovieDetailPlay',
  props: {
    movieId: {
      type: Number,
      default: undefined
    },
    movieTitle: {
      type: String,
      default: undefined
    }
  },
  data: function () {
    return {
      dialog: false,
      loading: true,
      playLinks: [undefinedPlayLink()],
      onlyOnline: false
    }
  },
  watch: {
    dialog: async function () {
      if (
        // dialog show
        this.dialog &&
        // play links is not [] (already get but no links)
        this.playLinks.length !== 0 &&
        // play links is undefined
        !this.playLinks[0].title
      ) {
        this.playLinks = await getPlayLinks(this.movieId)
        this.playLinks.forEach(link => {
          link.show = false
        })
        this.loading = false
      }
    },
    // when user switch movie, reset data
    movieId: function () {
      this.playLinks = [undefinedPlayLink()]
      this.loading = true
    }
  },
  methods: {
    setShow (index) {
      this.playLinks[index].show = !this.playLinks[index].show
      this.$set(this.playLinks, index, this.playLinks[index])
    },
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
    async copy (value) {
      try {
        await navigator.clipboard.writeText(value)
        Message.success()
      } catch (e) {
        Message.error(e)
      }
    }
  }
}
</script>

<style>
</style>
