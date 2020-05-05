module.exports = {
  'transpileDependencies': [
    'vuetify'
  ],

  devServer: {
    proxy: process.env.VUE_APP_BASE_API
  },

  pluginOptions: {
    i18n: {
      locale: 'zh-CN',
      fallbackLocale: 'zh-CN',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'source-map'
    }
  }

}
