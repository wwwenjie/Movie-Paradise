<template>
  <v-sheet
    class="mx-auto"
  >
    <v-skeleton-loader
      :loading="loading"
      type="chip"
      transition="fade-transition"
    >
      <p class="title ml-2 mb-0">{{genre}}</p>
    </v-skeleton-loader>
    <v-skeleton-loader
      :loading="loading"
      type="image"
      transition="fade-transition"
    >
      <v-slide-group
        center-active
        v-model="model"
        class="mt-n4 mx-1"
      >
        <v-slide-item
          v-for="n in 10"
          :key="n"
          v-slot:default="{ active, toggle }"
          class="mx-1"
        >
          <v-img
            :gradient="active ? 'to bottom,rgba(64, 64, 64, 0) 0%,rgba(64, 64, 64, 50) 100%' : undefined"
            :src="detail.poster"
            class="ma-4"
            height="180"
            width="130"
            @click="toggle"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <v-scale-transition>
                <v-icon
                  v-if="active"
                  color="white"
                  size="48"
                  v-text="'mdi-close-circle-outline'"
                ></v-icon>
              </v-scale-transition>
            </v-row>
          </v-img>
        </v-slide-item>
      </v-slide-group>
    </v-skeleton-loader>
    <movie-scroll-detail
      :model="model"
      :detail="detail"
    />
  </v-sheet>
</template>

<script>
import MovieScrollDetail from './MovieScrollDetail'
import { getMovie } from '../../api/movie'
import { undefinedMovie } from '../../utils'
import { message } from '../../utils/message'

export default {
  name: 'MovieScroll',
  components: {
    'movie-scroll-detail': MovieScrollDetail
  },
  props: {
    genre: {
      type: String,
      default: 'Default'
    }
  },
  data: function () {
    return {
      model: undefined,
      loading: true,
      detail: undefinedMovie()
    }
  },
  mounted () {
    getMovie(1).then(res => {
      // make sure the key of data is same with the key response
      for (let [key, value] of Object.entries(res)) {
        this.detail[key] = value
      }
    }).catch(err => {
      console.log(err)
      message({ text: err, type: 'error' })
    })
    this.loading = false
  }
}
</script>

<style scoped>

</style>
