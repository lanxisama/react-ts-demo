const path = require('path')
module.exports = {
  mode:'none',
  entry: {
    index: './index.tsx'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename:'bundle.js'
  },
  module: {
    rules: [
      {
        test:/\.css$/,
        loader:['style-loader','css-loader']
      },{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader'
    }]
  },
}