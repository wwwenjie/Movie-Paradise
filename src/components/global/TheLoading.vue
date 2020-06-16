<template>
  <!--higher priority than dialog-->
  <v-overlay
    v-if="$store.state.loadingCon.loading"
    :value="$store.state.loadingCon.loading"
    style="z-index: 999"
  >
    <v-progress-circular
      :size="70"
      :width="7"
      :color="colors[index]"
      indeterminate
    />
  </v-overlay>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      colors: ['red', 'purple', 'blue', 'green', 'amber'],
      index: 0,
      pid: undefined
    }
  },
  mounted  () {
    this.pid = setInterval(() => {
      if (this.index === this.colors.length - 1) {
        this.index = 0
      } else {
        this.index++
      }
    }, this.$store.state.loadingCon.timeout)
    // auto close when time out
    setTimeout(() => {
      this.$store.commit('CLOSE_LOADING')
    }, this.timeout)
  },
  destroyed  () {
    clearInterval(this.pid)
  }
}
</script>

<style scoped>

</style>
