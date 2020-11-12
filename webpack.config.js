module.exports = {
  entry: ["@babel/polyfill", "./client/index.js"],
  output: {
    path: __dirname,
    filename: './public/dist/main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      }
    ]
  }
};
