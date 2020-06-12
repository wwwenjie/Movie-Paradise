<template>
  <!--higher priority than dialog-->
  <v-overlay
    :value="loading"
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
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    timeout: {
      type: Number,
      default: 10000
    }
  },
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
    }, 1500)
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
