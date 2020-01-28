<template>
  <v-sheet
    class="mx-auto"
    max-width="100vw"
  >
    <v-slide-group
      v-model="model"
      class="pa-1"
    >
      <v-slide-item
        v-for="n in 15"
        :key="n"
        v-slot:default="{ active, toggle }"
      >
        <v-img
          :gradient="active ? 'to bottom,rgba(64, 64, 64, 0) 0%,rgba(64, 64, 64, 50) 100%' : undefined"
          src="../assets/movie/2.jpg"
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
    <v-expand-transition>
      <v-sheet
        v-if="model != null"
        height="200"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <h3 class="title">Selected {{ model }}</h3>
        </v-row>
      </v-sheet>
    </v-expand-transition>
  </v-sheet>
</template>

<script>
export default {
  name: 'AppScroll',
  data: () => ({
    model: null
  })
}
</script>

<style scoped>

</style>
