<template>
  <v-img
    :src="posterPath"
    gradient="to bottom,rgba(64, 64, 64, 0) 70%,rgba(30, 30, 30, 100) 100%"
    width="100%"
    min-height="60vh"
    max-height="80vh"
    alt="poster"
  >
    <template v-slot:default>
      <v-row align="end" style="height: 100%" class="text-white">
        <v-row justify="center">
          <v-col cols="12" class="text-center p-0">
            <p class="headline font-weight-bold mb-1">
              {{ movie?.title }}
            </p>
            <p class="mb-0">
              {{ genres }}
            </p>
          </v-col>
          <v-col cols="3" class="flex flex-col align-center cursor-pointer" @click="shuffle">
            <v-icon icon="mdi-shuffle-variant" />
            <span class="caption">Shuffle</span>
          </v-col>
          <v-col cols="5" class="text-center">
            <TrailerDialog />
          </v-col>
          <v-col cols="3" class="flex flex-col align-center cursor-pointer" @click="goDetail">
            <v-icon icon="mdi-information-outline" />
            <span class="caption">More Info</span>
          </v-col>
        </v-row>
      </v-row>
    </template>
  </v-img>
</template>

<script setup lang="ts">
import { useMovieDetail } from '@/api/movie'
import { computed } from 'vue'
import { getImageUrl } from '@/utils/movie'
import TrailerDialog from '@/views/home/components/TrailerDialog.vue'

const { data: movie } = useMovieDetail(842675)

const posterPath = computed(() => getImageUrl(movie.value?.poster_path))
const genres = computed(() => movie.value?.genres?.map((genre) => genre.name).join(' / '))

const shuffle = () => {
  console.log('shuffle')
}

const goDetail = () => {
  console.log('goDetail')
}
</script>

<style scoped></style>
