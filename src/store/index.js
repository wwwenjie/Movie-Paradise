import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isHome: true
  },
  mutations: {
    SET_IS_HOME (state, boolean) {
      state.isHome = boolean
    }
  },
  actions: {},
  modules: {}
})
