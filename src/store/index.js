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
      show: undefined,
      text: 'Default Text',
      type: 'info',
      confirmText: 'Okay',
      declineText: 'No',
      callbackConfirm: () => {},
      callbackDecline: () => {},
      timeout: 0
    },
    darkMode: true,
    locale: 'zh-CN',
    allowImprove: {
      allow: false,
      asked: false
    },
    genreStore: [],
    movieCache: {}
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
    },
    SET_GENRE_STORE (state, value) {
      state.genreStore = value
    },
    SET_MOVIE_CACHE (state, cache) {
      for (let [key, value] of Object.entries(cache)) {
        state.movieCache[key] = value
      }
    }
  },
  actions: {},
  modules: {}
})
