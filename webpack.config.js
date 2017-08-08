var path = require('path');
var webpack = require('webpack');


module.exports = {
   entry:  './web_client/app.js',
   output:  {
       path: './society/static/js/',
       filename: 'app.js'
   },
   resolve: {
       extensions: ['', '.js', '.jsx', '.scss'],
       modulesDirectories: [
           'node_modules'
       ]
   },
   module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      query: { presets:['react'] }
  	}]
   },
   sassLoader: {
       includePaths: [
           path.resolve(__dirname, "./web_client"),
           path.resolve(__dirname, "./node_modules/bootstrap/scss")
       ]
   }
}