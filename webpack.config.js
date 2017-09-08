var path = require('path');
var webpack = require('webpack');


module.exports = {
   entry:  './web_client/app.js',
   output:  {
       path: __dirname + '/society/static/js',
       filename: 'app.js'
   },
   resolve: {
     modules: [
         'node_modules'
     ]
   },
   module: {
    loaders: [{
      test: /\.js$/,
      loaders: 'babel-loader',
      query: { presets:['react'] }
  	}]
   }
}
