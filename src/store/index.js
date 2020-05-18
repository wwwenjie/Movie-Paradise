import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      reducer: (persistedState) => {
        const stateFilter = Object.assign({}, persistedState)
        const blackList = ['snackCon']
        blackList.forEach((item) => {
          delete stateFilter[item]
        })
        return stateFilter
      }
    })
  ],
  state: {
    snackCon: {
      show: false,
      text: '',
      closeText: 'Close',
      type: '',
      timeout: 0
    },
    darkMode: true,
    locale: 'zh-CN',
    allowImprove: {
      allow: false,
      asked: false
    }
  },
  mutations: {
    CALL_MESSAGE (state, config) {
      for (let [key, value] of Object.entries(config)) {
        state.snackCon[key] = value
      }
    },
    SET_DARK_MODE (state, value) {
      state.darkMode = value
    },
    SET_LOCALE (state, value) {
      state.locale = value
    },
    SET_ALLOW_IMPROVE (state, value) {
      state.allowImprove = value
    }
  },
  actions: {},
  modules: {}
})
