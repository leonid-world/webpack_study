var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'none', // mode 속성은 웹팩 버전 4 이상에서 추가된 속성이다. 웹팩으로 빌드할 때, development, production, none 모드를 설정할 수 있다.
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader : MiniCssExtractPlugin},
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
}