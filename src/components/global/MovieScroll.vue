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
          v-for="(movie,index) in movies"
          :key="index"
          v-slot:default="{ active, toggle }"
          class="mx-1"
        >
          <v-img
            :gradient="active ? 'to bottom,rgba(64, 64, 64, 0) 0%,rgba(64, 64, 64, 50) 100%' : undefined"
            :src="movie.poster"
            class="ma-4"
            height="180"
            width="130"
            @error="error[index] = true"
            @click="toggle"
          >
            <template v-slot:default>
              <!--some errors need to be fixed:-->
              <!--css: 'error' div occupy icon space-->
              <!--unknown: 'error' div doesnt load if doesnt click group-->
              <div v-if="error[index]" class="d-flex align-center fill-height text-center">
                <span
                  class="headline"
                  style="white-space:normal;word-break: break-all;"
                >
                  {{movie.title}}
                </span>
              </div>
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
            </template>
          </v-img>
        </v-slide-item>
      </v-slide-group>
    </v-skeleton-loader>
    <v-expand-transition>
      <movie-scroll-detail
        :model="model"
        :detail="movies[model]"
      />
    </v-expand-transition>
  </v-sheet>
</template>

<script>
import MovieScrollDetail from './MovieScrollDetail'
import { message } from '../../utils/message'
import { undefinedMovie } from '../../utils'
import { getMovieByGenre } from '../../api/movie'

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
      limit: 8,
      loading: true,
      error: [false],
      movies: [undefinedMovie()]
    }
  },
  mounted () {
    this.error = [...Array(this.limit)].map(() => false)
    this.movies = [...Array(this.limit)].map(() => undefinedMovie())
    getMovieByGenre(this.genre, this.limit).then(res => {
      this.movies = res.movies
      this.loading = false
    }).catch(err => {
      console.log(err)
      message({ text: err, type: 'error' })
    })
  }
}
</script>

<style scoped>

</style>
