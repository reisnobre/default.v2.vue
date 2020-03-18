const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  pwa: {
    name: 'Defaults',
    themeColor: '#1E165D', // project main color
    msTileColor: '#1E165D', // project main color
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [/\.map$/, /manifest\.json$/]
    }
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')
    config.plugin('html').tap(args => {
      args[0].title = 'Title goes Here'
      return args
    })
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV !== 'production') return
    return {
      plugins: [
        new FaviconsWebpackPlugin({
          // Your source logo
          logo: path.join(__dirname, './public/img/logo.png'),
          // logo: './minimal-logo.png',
          // The prefix for all image files (might be a folder or a name)
          prefix: 'img/icons/',
          // Emit all stats of the generated icons
          emitStats: false,
          // The name of the json containing all favicon information
          statsFilename: 'iconstats-[hash].json',
          // Generate a cache file with control hashes and
          // don't rebuild the favicons until those hashes change
          persistentCache: false,
          // Inject the html into the html-webpack-plugin
          inject: true,
          // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
          background: null,
          // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
          title: 'Defaults',
          // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
          icons: {
            android: true,
            appleIcon: true,
            appleStartup: true,
            coast: false,
            favicons: true,
            firefox: true,
            opengraph: false,
            twitter: false,
            yandex: false,
            windows: true
          }
        }),
        new PrerenderSPAPlugin({
          // Required - The path to the webpack-outputted app to prerender.
          staticDir: path.join(__dirname, 'dist'),

          // Optional - The path your rendered app should be output to.
          // (Defaults to staticDir.)
          outputDir: path.join(__dirname, 'dist'),

          // Optional - The location of index.html
          indexPath: path.join(__dirname, 'dist', 'index.html'),

          // Required - Routes to render.
          routes: ['/'],
          // Optional - Uses html-minifier (https://github.com/kangax/html-minifier)
          // To minify the resulting HTML.
          // Option reference: https://github.com/kangax/html-minifier#options-quick-reference
          minify: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            decodeEntities: true,
            keepClosingSlash: true,
            sortAttributes: true
          },
          // The actual renderer to use. (Feel free to write your own)
          // Available renderers: https://github.com/Tribex/prerenderer/tree/master/renderers
          renderer: new Renderer({
            // Optional - The name of the property to add to the window object with the contents of `inject`.
            injectProperty: '__PRERENDER_INJECTED',
            // Optional - defaults to 0, no limit.
            // Routes are rendered asynchronously.
            // Use this to limit the number of routes rendered in parallel.
            maxConcurrentRoutes: 4,
            // Other puppeteer options.
            // (See here: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)
            headless: false // Display the browser window when rendering. Useful for debugging.
          })
        })
      ]
    }
  }
}
