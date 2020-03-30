import store from '../store'

export function message (config) {
  if (!config.show) {
    config.show = true
  }
  store.commit('CALL_MESSAGE', config)
}
