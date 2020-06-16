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
    messageCon: {
      show: false,
      text: undefined,
      type: 'info',
      confirmText: undefined,
      declineText: undefined,
      callbackConfirm: () => {
      },
      callbackDecline: () => {
      },
      timeout: -1
    },
    loading: false,
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
    token: undefined,
    userStore: {}
  },
  mutations: {
    CALL_MESSAGE (state, config) {
      for (const [key, value] of Object.entries(config)) {
        state.messageCon[key] = value
      }
    },
    CALL_LOADING (state) {
      state.loading = true
    },
    CLOSE_LOADING (state) {
      state.loading = false
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
      for (const [key, value] of Object.entries(cache)) {
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
    SET_LOGIN_DATA (state, user) {
      if (user.token) {
        state.token = user.token
        delete user.token
      }
      for (const [key, value] of Object.entries(user)) {
        state.userStore[key] = value
      }
    },
    CLEAR_LOGIN_DATA (state) {
      state.token = undefined
      state.userStore = { }
    }
  },
  actions: {},
  modules: {}
})
