import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackCon: {
      show: false,
      text: '',
      closeText: 'Close',
      type: '',
      timeout: 0
    }
  },
  mutations: {
    CALL_MESSAGE (state, config) {
      for (let [key, value] of Object.entries(config)) {
        state.snackCon[key] = value
      }
    }
  },
  actions: {},
  modules: {}
})
