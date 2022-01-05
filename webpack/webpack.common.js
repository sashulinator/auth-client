const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolveTsconfigPathsToAlias = require('./resolveTsconfigPathsToWebpackAlias.js')

const tsconfigPathAliases = resolveTsconfigPathsToAlias({
  tsconfigPath: '../tsconfig.json', // Using custom path
  projectRoot: path.join(__dirname, '../'), // Using custom path
})

module.exports = {
  entry: path.resolve(__dirname, '..', './src/app/index.tsx'),
  resolve: {
    alias: {
      ...tsconfigPathAliases,
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/app/index.html'),
    }),
  ],
  stats: 'errors-only',
}
