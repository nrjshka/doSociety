const path = require('path');
require('webpack');


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
       rules: [
           {
               test: /\.jsx?$/,
               use: [
                  'babel-loader'
               ],
               include: [
                   path.resolve(__dirname, "web_client")
               ],
               query: {
                   plugins: ['transform-runtime'],
                   presets: ['es2015', 'stage-0', 'react']
               }
           },
           {
               test: /\.s[a|c]ss$/,
               use: [
                'style-loader',
                'css-loader',
                'sass-loader'
               ]
           }
       ]
   },
   sassLoader: {
       includePaths: [
           path.resolve(__dirname, "./web_client"),
           path.resolve(__dirname, "./node_modules/bootstrap/scss")
       ]
   }
}