import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackCon: {
      show: false,
      text: '',
      closeText: '',
      type: '',
      timeout: 0
    }
  },
  mutations: {
    CALL_SNACK (state, config) {
      state.snackCon.show = config.show !== false
      state.snackCon.text = config.text
      state.snackCon.closeText = config.closeText || 'Close'
      state.snackCon.type = config.type
      state.snackCon.timeout = config.timeout || 0
    }
  },
  actions: {},
  modules: {}
})
