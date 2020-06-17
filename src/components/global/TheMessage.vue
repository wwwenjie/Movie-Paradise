<template>
  <v-fade-transition>
    <v-snackbar
      v-model="messageCon.show"
      :color="messageCon.type"
      :timeout="messageCon.timeout"
      :vertical="this.$vuetify.breakpoint.smAndDown"
      absolute
      top
      elevation="12"
      style="z-index: 6"
    >
      {{ messageCon.text }}
      <template v-slot:action>
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
      </template>
    </v-snackbar>
  </v-fade-transition>
</template>

<script>
import storeMap from '../../mixins/storeMap'

export default {
  name: 'TheMessage',
  mixins: [storeMap],
  destroyed () {
    this.reset()
  },
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
