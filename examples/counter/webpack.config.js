const HtmlWebpackPlugin = require('html-webpack-plugin');
const externals = require('frint-config').externals;

module.exports = {
  entry: {
    core: __dirname + '/core/index.js'
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/build/js',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        query: {
          presets: [
            'travix'
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/layouts/index.ejs',
      filename: __dirname + '/build/index.html',
      chunksSortMode({ names }) {
        return names[0] === 'core' ? -1 : 1;
      }
    })
  ],
  externals: Object.assign({}, externals, {
    'lodash': '_',
    'frint': 'Frint',
    'frint-react': 'FrintReact',
    'frint-store': 'FrintStore',
    'prop-types': 'PropTypes',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'rxjs': 'Rx'
  })
};
