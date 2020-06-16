<template>
  <v-snackbar
    v-if="snackCon.show"
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
import storeMap from '../../mixins/storeMap'

export default {
  name: 'Snackbar',
  mixins: [storeMap],
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
