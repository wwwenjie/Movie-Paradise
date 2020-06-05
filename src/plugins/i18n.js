import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../locales'

Vue.use(VueI18n)

let locale = 'en-US'
if (localStorage.getItem('vuex')) {
  locale = JSON.parse(localStorage.getItem('vuex')).locale
} else {
  const lang = [
    ['zh-CN', 'zh'],
    ['en-US', 'en']
  ]
  for (const langArray of lang) {
    if (langArray.includes(navigator.language)) {
      locale = langArray[0]
      break
    }
  }
}

export default new VueI18n({
  locale: locale,
  fallbackLocale: 'en-US',
  messages: messages
})
