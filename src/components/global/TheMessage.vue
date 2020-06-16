<template>
  <v-snackbar
    v-if="messageCon.show"
    v-model="messageCon.show"
    :color="messageCon.type"
    :timeout="messageCon.timeout"
    :vertical="this.$vuetify.breakpoint.smAndDown"
    top
  >
    {{ messageCon.text }}
    <div
      class="d-flex"
      style="justify-content: flex-end"
    >
      <v-btn
        v-if="messageCon.confirmText"
        text
        class="mt-0"
        @click="confirm"
      >
        {{ messageCon.confirmText }}
      </v-btn>
      <v-btn
        v-if="messageCon.declineText"
        text
        class="mt-0"
        @click="decline"
      >
        {{ messageCon.declineText }}
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script>
import storeMap from '../../mixins/storeMap'

export default {
  name: 'TheMessage',
  mixins: [storeMap],
  methods: {
    confirm () {
      this.messageCon.callbackConfirm()
      this.reset()
    },
    decline () {
      this.messageCon.callbackDecline()
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
        timeout: -1
      })
    }
  }
}
</script>

<style scoped>

</style>
