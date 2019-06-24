// vue.config.js
module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Or array of paths
          resources: ['./src/assets/scss/mixins/_animation.scss', './src/assets/scss/mixins/_set-color.scss', './src/assets/scss/mixins/_theme_default.scss']
        })
        .end()
    })
  }
}