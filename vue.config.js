const title = '奇思站'

module.exports = {
  publicPath: './',
  // publicPath: process.env.NODE_ENV === 'production' ? `/qszone/` : './',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = title
      return args
    })
  }
}
