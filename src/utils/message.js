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

  static info (text = 'Info') {
    this.call({
      text: text,
      confirmText: undefined,
      declineText: undefined,
      type: 'info',
      timeout: 2000
    })
  }

  // color of success is not cool with our website, not recommended
  static success (text = 'Success') {
    this.call({
      text: text,
      confirmText: 'Okay',
      declineText: undefined,
      type: 'success',
      timeout: 2000
    })
  }

  static error (text = 'Error') {
    this.call({
      text: text,
      confirmText: 'Okay',
      declineText: undefined,
      type: 'error'
    })
  }
}
