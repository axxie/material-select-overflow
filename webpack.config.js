const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
  mode: 'development',
  entry: ['./app.scss', './app.js'],
  output: {
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['./node_modules']
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
          plugins: ['transform-object-assign']
        },
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
      }      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: 'index.html'
      }
    )
  ]
}];
