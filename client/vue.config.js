const path = require('path');
module.exports = {
  publicPath: '/',
  outputDir: path.resolve(__dirname,'../service/public'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true
      }
    }
  }
}
