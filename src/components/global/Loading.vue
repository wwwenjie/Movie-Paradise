<template>
  <v-overlay
    :value="loading"
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
import Message from '../../utils/message'

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
      Message.error('time out')
      this.$store.commit('REVERSE_LOADING')
    }, this.timeout)
  },
  destroyed  () {
    clearInterval(this.pid)
  }
}
</script>

<style scoped>

</style>
