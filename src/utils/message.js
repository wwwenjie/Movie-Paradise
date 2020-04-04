import store from '../store'

export default class Message {
  // function for setting more params
  // show,text,closeText,type,timeout
  static call (config) {
    if (config.show === undefined) {
      config.show = true
    }
    store.commit('CALL_MESSAGE', config)
  }

  static default (text = 'Default Text') {
    this.call({ text: text })
  }

  static success (text = 'Success') {
    this.call({ text: text, type: 'success' })
  }

  static error (text = 'Error') {
    this.call({ text: text, type: 'error' })
  }
}
