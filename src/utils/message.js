import store from '../store'

export default class Message {
  /**
   * show: boolean, text: string, type: string, confirmText: string, declineText:string
   * callbackConfirm: function, callbackDecline: function, timeout: number
   */
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

  // alias of info
  static success (text = 'Success') {
    console.log(this)
    this.call({
      text: text,
      confirmText: undefined,
      declineText: undefined,
      type: 'info',
      timeout: 2000
    })
  }

  static error (text = 'Error') {
    this.call({
      text: text,
      confirmText: undefined,
      declineText: undefined,
      type: 'error'
    })
  }
}
