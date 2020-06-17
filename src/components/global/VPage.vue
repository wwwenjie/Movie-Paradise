<template>
  <v-sheet
    width="100%"
    class="fill-height"
  >
    <v-toolbar v-if="title">
      <v-btn
        v-if="!noBack"
        icon
        @click="computedFunction"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title class="pl-0">
        {{ title }}
      </v-toolbar-title>
    </v-toolbar>
    <slot />
  </v-sheet>
</template>

<script>
export default {
  name: 'VPage',
  props: {
    title: {
      type: String,
      default: undefined
    },
    noBack: {
      type: Boolean,
      default: false
    },
    backFunction: {
      type: Function,
      default: function () {
        this.$router.back()
      }
    }
  },
  computed: {
    computedFunction () {
      // props function wont bind this so we use computed to bind this
      return this.backFunction.bind(this)
    }
  }
}
</script>

<style scoped>

</style>
