<template>
  <v-navigation-drawer
    v-model="drawerVisible"
    app
    clipped
  >
    <v-subheader class="mt-4 grey--text text--darken-1">
      {{ $t('genre') }}
    </v-subheader>
    <v-list dense>
      <v-list-item
        v-for="genre in genres"
        :key="genre.name"
        link
        @click="goMore(genre)"
      >
        <v-list-item-action />
        <v-list-item-content>
          <v-list-item-title>
            {{ locale==='zh-CN'? genre.name : genre.name_en }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        @click="moreGenre"
      >
        <v-list-item-action>
          <v-icon color="grey darken-1">
            mdi-plus-circle-outline
          </v-icon>
        </v-list-item-action>
        <v-list-item-title class="grey--text text--darken-1">
          <div
            class="d-flex"
            style="justify-content: space-between"
          >
            {{ $t('more') }}
            <v-btn
              v-if="genres.length > 6"
              outlined
              x-small
              @click.stop="genres = genres.slice(0, 6)"
            >
              {{ $t('clear') }}
            </v-btn>
          </div>
        </v-list-item-title>
      </v-list-item>
      <v-list-item
        link
        :to="{ path: '/settings' }"
      >
        <v-list-item-action>
          <v-icon color="grey darken-1">
            mdi-settings
          </v-icon>
        </v-list-item-action>
        <v-list-item-title class="grey--text text--darken-1">
          {{ $t('settings') }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { getGenres } from '../api/genre'
import storeMap from '../mixins/storeMap'

export default {
  name: 'AppNavigationDrawer',
  mixins: [storeMap],
  props: {
    drawer: {
      type: Boolean
    }
  },
  data () {
    return {
      genres: []
    }
  },
  computed: {
    drawerVisible: {
      get: function () {
        return this.drawer
      },
      set: function (newValue) {
        this.$emit('update:drawer', newValue)
        return newValue
      }
    }
  },
  async mounted () {
    if (this.genreStore.length === 0) {
      this.setGenreStore(await getGenres(100))
    }
    this.genres = this.genreStore.slice(0, 6)
  },
  methods: {
    moreGenre () {
      this.genres = this.genres.concat(this.genreStore.slice(this.genres.length, this.genres.length + 5))
    },
    goMore (genre) {
      this.$router.push({ path: '/movies',
        query: {
          genre: genre.name,
          title: this.locale === 'zh-CN' ? genre.name : genre.name_en
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
