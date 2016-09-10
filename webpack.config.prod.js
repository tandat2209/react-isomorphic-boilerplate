import webpack from 'webpack';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line no-var

export const appCssPath = "styles.css";

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
    __dirname + '/src/index.js',
  ],
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
    // publicPath: '/assets/' <= remember the '/' in the end.
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        loader: 'url-loader?limit=10000',
        test: /\.(gif|jpg|png|svg)$/
      }, {
        loader: 'url-loader?limit=1',
        test: /favicon\.ico$/
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          [
            // 'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]--[hash:base64:5]',
            'css-loader?modules&importLoaders=2&localIdentName=[local]',
            'postcss-loader',
            'sass-loader',
          ]
        ),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          [
            'css-loader?modules&importLoaders=2&localIdentName=[local]',
            'postcss-loader',
          ]
        ),
      },
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('styles.css', {
        allChunks: true
    })
  ]
};
