<template>
  <v-expand-transition>
    <v-sheet
      v-if="model != null"
      tile
    >
      <v-row
        v-for="(item,key) in data"
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
        justify="space-around"
      >
        <v-col
          align="center"
          cols="3"
          class="pa-0 pt-2">
          <v-icon class="d-block">mdi-plus</v-icon>
          <span class="caption">加入片库</span>
        </v-col>
        <v-col
          align="center"
          cols="5"
        >
          <v-btn width="100%" depressed light class="font-weight-bold">详情</v-btn>
        </v-col>
        <v-col
          align="center"
          cols="3"
          class="pa-0 pt-2">
          <v-icon class="d-block">mdi-share</v-icon>
          <span class="caption">分享</span>
        </v-col>
      </v-row>
    </v-sheet>
  </v-expand-transition>
</template>

<script>
export default {
  name: 'AppScrollDetail',
  props: ['model', 'data']
}
</script>

<style scoped>

</style>
