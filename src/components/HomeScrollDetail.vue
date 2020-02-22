<template>
  <v-expand-transition>
    <v-sheet
      v-if="model != null"
      tile
    >
      <v-row
        v-for="(item,key) in detail"
        :key="key"
        justify="start"
        class="ml-4"
      >
        <h3 v-if="item.value && key!=='rate'" class="title">{{item.title}}: {{item.value}}</h3>
        <div v-else-if="key==='rate'">
          <h3 v-if="item[0].value" class="title d-inline">{{item[0].title}} {{item[0].value}}</h3>
          <h3 v-if="item[1].value" class="title d-inline"> / {{item[1].title}} {{item[1].value}}</h3>
        </div>
      </v-row>
      <v-row
        justify="center"
      >
        <v-col
          cols="3"
          class="pa-0 pt-2 text-center"
        >
          <v-icon class="d-block">mdi-plus</v-icon>
          <span class="caption">加入片库</span>
        </v-col>
        <v-col
          cols="6"
        >
          <v-btn
            light
            depressed
            width="100%"
            class="font-weight-bold"
            @click="goDetail"
          >
            详情
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          class="pa-0 pt-2 text-center"
        >
          <v-icon class="d-block">mdi-share</v-icon>
          <span class="caption">分享</span>
        </v-col>
      </v-row>
    </v-sheet>
  </v-expand-transition>
</template>

<script>
import router from '../router'

export default {
  name: 'HomeScrollDetail',
  props: ['model', 'detail'],
  methods: {
    goDetail () {
      let movieId = '1'
      router.push({ path: `/movie/${movieId}` })
    }
  }
}
</script>

<style scoped>

</style>
