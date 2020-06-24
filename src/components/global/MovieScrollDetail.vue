<template>
  <v-sheet tile>
    <div class="ml-4">
      <p class="title">
        {{ detail.title }}
      </p>
      <p>
        <span v-if="detail.rating && detail.rating.douban_score">
          {{ $t('douban') }} {{ detail.rating.douban_score }}
        </span>
        <span v-if="detail.rating && detail.rating.imdb_score">
          IMDb {{ detail.rating.imdb_score }}
        </span>
      </p>
      <p>{{ $t('genre') }}: {{ detail.info.genre }}</p>
      <p>{{ $t('region') }}: {{ detail.info.region }}</p>
      <p class="mb-0">{{ $t('year') }}: {{ detail.year }}</p>
    </div>
    <v-container>
      <v-row
        justify="center"
      >
        <v-col
          cols="3"
          class="pa-0 pt-1 text-center"
        >
          <v-btn
            text
            x-large
            class="px-0"
            @click="addMovieToUser(detail._id,'list')"
          >
            <div>
              <v-icon class="d-block">
                mdi-plus
              </v-icon>
              <span class="caption">
                {{ $t('addList') }}
              </span>
            </div>
          </v-btn>
        </v-col>
        <v-col
          cols="5"
        >
          <v-btn
            light
            width="100%"
            class="font-weight-bold"
            @click="goDetail"
          >
            {{ $t('detail') }}
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          class="pa-0 pt-1 text-center"
        >
          <v-btn
            text
            x-large
            class="px-0"
            @click="todo"
          >
            <div>
              <v-icon class="d-block">
                mdi-share
              </v-icon>
              <span class="caption">
                {{ $t('share') }}
              </span>
            </div>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import router from '../../router'
import { undefinedMovie } from '../../utils'
import userMixin from '../../mixins/userMixin'
import appMixin from '../../mixins/appMixin'

export default {
  name: 'MovieScrollDetail',
  mixins: [userMixin, appMixin],
  props: {
    detail: {
      type: Object,
      default: () => undefinedMovie()
    }
  },
  methods: {
    goDetail () {
      router.push({ path: `/movie/${this.detail.path}` })
    }
  }
}
</script>

<style scoped>

</style>
