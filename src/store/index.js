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
      text: undefined,
      type: 'info',
      confirmText: undefined,
      declineText: undefined,
      callbackConfirm: () => {
      },
      callbackDecline: () => {
      },
      timeout: 0
    },
    loadingCon: {
      loading: false,
      timeout: 10000
    },
    darkMode: true,
    locale: 'zh-CN',
    allowImprove: {
      allow: false,
      asked: false
    },
    genreStore: [],
    movieCache: {},
    lastCacheDate: 0,
    popAccount: false,
    uid: undefined,
    token: undefined,
    userName: undefined
  },
  mutations: {
    CALL_MESSAGE (state, config) {
      for (let [key, value] of Object.entries(config)) {
        state.snackCon[key] = value
      }
    },
    REVERSE_LOADING (state, timeout = 10000) {
      state.loadingCon.loading = !state.loadingCon.loading
      state.loadingCon.timeout = timeout
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
    },
    SET_CACHE_DATE (state, value) {
      state.lastCacheDate = value
    },
    CLEAR_MOVIE_CACHE (state) {
      state.movieCache = { }
    },
    SET_POP_ACCOUNT (state, value) {
      state.popAccount = value
    },
    SET_LOGIN_DATA (state, value) {
      state.uid = value.uid
      state.token = value.token
      state.userName = value.name
    }
  },
  actions: {},
  modules: {}
})
