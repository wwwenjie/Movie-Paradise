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
  static success (text = this.getDefaultSuccessText()) {
    this.call({
      text: text,
      confirmText: undefined,
      declineText: undefined,
      type: 'info',
      timeout: 2000
    })
  }

  static error (text = this.getDefaultErrorText()) {
    this.call({
      text: text,
      confirmText: undefined,
      declineText: undefined,
      type: 'error',
      timeout: 2000
    })
  }

  static getDefaultSuccessText () {
    if (store.state.locale === 'zh-CN') {
      return '成功'
    } else {
      return 'Success'
    }
  }

  static getDefaultErrorText () {
    if (store.state.locale === 'zh-CN') {
      return '错误'
    } else {
      return 'Error'
    }
  }
}
