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
  /* ,
    pluginOptions: {
      prerenderSpa: {
        registry: undefined,
        renderRoutes: [
          '/',
          '/about',
          '/blog',
          '/blog/articlelist',
          '/blog/updatalog',
          '/blog/user',
          '/login',
          '/reg'
        ],
        useRenderEvent: true,
        onlyProduction: true,

        headless: true,
        customRendererConfig: {
          args: ['--auto-open-devtools-for-tabs']
        }
      }
    } */
}