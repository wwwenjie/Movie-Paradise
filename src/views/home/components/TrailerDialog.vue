<template>
  <v-dialog v-model="dialogVisible">
    <template v-slot:activator="{ props }">
      <v-btn class="w-full bg-red-600" v-bind="props">
        <v-icon left icon="mdi-play" />
        {{ emptyTrailers ? 'no trailer' : 'trailer' }}
      </v-btn>
    </template>

    <v-card v-if="!emptyTrailers">
      <iframe class="h-[210px]" :src="youtubeUrl" />
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMovieVideo } from '@/api/movie'
import { isEmpty } from 'lodash'

const { data: video } = useMovieVideo(842675)

const dialogVisible = ref(false)

const emptyTrailers = computed(() => isEmpty(video.value?.results))
const youtubeUrl = computed(() => {
  return `https://www.youtube.com/embed/${video.value?.results?.[0].key}`
})
</script>

<style scoped></style>
