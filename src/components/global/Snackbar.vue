<template>
  <v-snackbar
    v-model="snackbarVisible"
    :color="snackCon.type"
    :timeout="snackCon.timeout"
    :multi-line="this.$vuetify.breakpoint.mdAndDown"
    top
  >
    {{ snackCon.text }}
    <v-btn
      text
      @click="snackbarVisible = false"
    >
      {{ snackCon.closeText }}
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',
  props: {
    show: {
      type: Boolean
    },
    snackCon: {
      type: Object,
      // the default value is set at store CALL_SNACK
      default: () => ({
        text: '',
        closeText: '',
        type: '',
        timeout: 0
      })
    }
  },
  computed: {
    snackbarVisible: {
      get: function () {
        return this.show
      },
      set: function (newValue) {
        this.$emit('update:show', newValue)
        return newValue
      }
    }
  }
}
</script>

<style scoped>

</style>
