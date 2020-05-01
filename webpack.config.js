const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/js/app.ts',
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	devServer: {
		contentBase: './dist'
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				exclude: /node_modules/,
				use: [
					{ loader: "ts-loader" }
				]
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					"style-loader",
					"css-loader"
				]
			},
			{
				test: /\.mp3$/,
				exclude: /node_modules/,
				use: [
					{ loader: 'file-loader' }
				]
			},
			{
				test: /\.(png|svg|jp(e*)g|gif)$/,
				exclude: /node_modules/,
				use: [
					'file-loader'
				]
			}
		]
	},
	plugins: [
    	new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new CopyWebpackPlugin([
            {from:'src/assets',to:'assets'} 
        ])
  ],
}