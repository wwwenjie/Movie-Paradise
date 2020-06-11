<template>
  <v-snackbar
    v-model="snackCon.show"
    :color="snackCon.type"
    :timeout="snackCon.timeout"
    :vertical="this.$vuetify.breakpoint.smAndDown"
    top
  >
    {{ snackCon.text }}
    <div
      class="d-flex"
      style="justify-content: flex-end"
    >
      <v-btn
        v-if="snackCon.confirmText"
        text
        class="mt-0"
        @click="confirm"
      >
        {{ snackCon.confirmText }}
      </v-btn>
      <v-btn
        v-if="snackCon.declineText"
        text
        class="mt-0"
        @click="decline"
      >
        {{ snackCon.declineText }}
      </v-btn>
    </div>
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
      // the default value is set at store snackCon
      default: () => ({
        text: undefined,
        type: undefined,
        confirmText: undefined,
        declineText: undefined,
        callbackConfirm: function () {},
        callbackDecline: function () {},
        timeout: 0
      })
    }
  },
  methods: {
    confirm () {
      this.snackCon.callbackConfirm()
      this.reset()
    },
    decline () {
      this.snackCon.callbackDecline()
      this.reset()
    },
    reset () {
      this.$store.commit('CALL_MESSAGE', {
        show: false,
        text: undefined,
        type: 'info',
        confirmText: undefined,
        declineText: undefined,
        callbackConfirm: () => {},
        callbackDecline: () => {},
        timeout: 0
      })
    }
  }
}
</script>

<style scoped>

</style>
