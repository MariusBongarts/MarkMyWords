const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  // Polyfills have to be installed in root page
  mode: 'production', resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\.scss$/, include: /index\.scss$/, use: [{ loader: MiniCssExtractPlugin.loader },
          'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.scss$/, exclude: /index\.scss$/, use: ['to-string-loader',
          'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{ loader: 'file-loader', options: { outputPath: 'assets/' } }]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: 'all',
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin(), new MiniCssExtractPlugin()
  ]
};
