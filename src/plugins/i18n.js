import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../locales'

Vue.use(VueI18n)

export default new VueI18n({
  locale: localStorage.getItem('vuex') ? JSON.parse(localStorage.getItem('vuex')).locale : navigator.language,
  fallbackLocale: 'zh-CN',
  messages: messages
})
