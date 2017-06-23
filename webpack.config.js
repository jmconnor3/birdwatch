// const webpack = require('webpack'); // webpack itself
// const path = require('path'); // nodejs dependency when dealing with paths
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // require webpack plugin
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // require webpack plugin
// const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin'); // require webpack plugin

// let config = { // config object
//   entry: './src/index.js', // entry file
//   output: { // output
//     path: path.resolve(__dirname, 'public'), // ouput path
//     filename: 'output.js' // output filename
//   },
//   resolve: { // These options change how modules are resolved
//     extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png'], // Automatically resolve certain extensions
//     alias: { // Create aliases
//       images: path.resolve(__dirname, 'src/assets/images')  // src/assets/images alias
//     }
//   },
//   module: {
//     rules: [ // loader rules
//       {
//         test: /\.js$/, // files ending with .js
//         exclude: /node_modules/, // exclude the node_modules directory
//         loader: 'babel-loader' // use this (babel-core) loader
//       },
//       {
//         test: /\.scss$/, // files ending with .scss
//         use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({  // HMR for styles
//           fallback: 'style-loader',
//           use: ['css-loader', 'sass-loader', 'postcss-loader'],
//         })),
//       },
//       {
//         test: /\.jsx$/, // all files ending with .jsx
//         loader: 'babel-loader', // use the babel-loader for all .jsx files
//         exclude: /node_modules/ // exclude searching for files in the node_modules directory
//       },
//       {
//         test: /\.(jpe?g|png|gif|svg)$/i,
//         loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {  // images loader
//           loader: 'image-webpack-loader',
//           query: {
//             mozjpeg: {
//               progressive: true,
//             },
//             gifsicle: {
//               interlaced: false,
//             },
//             optipng: {
//               optimizationLevel: 4,
//             },
//             pngquant: {
//               quality: '75-90',
//               speed: 3,
//             },
//           },
//         }],
//         exclude: /node_modules/,
//         include: __dirname,
//       },
//     ] // end rules
//   },
//   plugins: [ // webpack plugins
//     new ExtractTextWebpackPlugin('styles.css'), // call the ExtractTextWebpackPlugin constructor and name our css file
//   ],
//   devServer: {
//     contentBase: path.resolve(__dirname, 'public'), // A directory or URL to serve HTML content from.
//     historyApiFallback: true, // fallback to /index.html for Single Page Applications.
//     inline: true, // inline mode (set to false to disable including client scripts (like livereload)
//     open: true, // open default browser while launching
//     compress: true, // Enable gzip compression for everything served:
//     hot: true // Enable webpack's Hot Module Replacement feature
//   },
//   devtool: 'eval-source-map', // enable devtool for better debugging experience
// }

// module.exports = config;

// if (process.env.NODE_ENV === 'production') { // if we're in production mode, here's what happens next
//   module.exports.plugins.push(
//     new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
//     new OptimizeCSSAssets() // call the css optimizer (minfication)
//   );
// }





const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); 
//transpile our scss into a css folder for out public directory
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//uglify our client facing files
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');


let config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename:'output.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/, //files ending with js
        exclude: /node_modules/, //exclude node_modules directory
        loader: "babel-loader"  //babel-core
      },
      {
        test: /\.scss$/, //files ending with.scss
        use: ExtractTextWebpackPlugin.extract({ //extract method
          use: ['css-loader', 'sass-loader'], 
          fallback: 'style-loader'  //fallback for any CSS not extracted
        })
      },
      {
        test: /\.jsx$/, // all files ending with .jsx
        loader: 'babel-loader', // use the babel-loader for all .jsx files
        exclude: /node_modules/ // exclude searching for files in the node_modules directory
      },
   
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('styles.css'), //call and name our css file
    new webpack.optimize.UglifyJsPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'), //url to serve HTML contents from
    historyApiFallback: true, //fallback to index.html for Single Page applications
    inline: true, 
    open: true //open default browser when launching
  },
  devtool: 'eval-source-map' //better dev tools
}


/** COMMANDS
1. ( npm run build ) to transpile 
2. ( npm start ) to open browser 
( npm run production ) specify when you are in a production environment
**/

module.exports = config

if (process.env.NODE_ENV === "production"){
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(), //uglify
    new OptimizeCSSAssets() //CSS minifier
  );
}