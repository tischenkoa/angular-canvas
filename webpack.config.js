// для добавление библиотеки добавим ее в vendor и  noParse
var webpack = require('webpack');

module.exports = {
	context: __dirname + '/dev/app',
	entry: {
		app: './index.js'
	},
	output: {
		path: './build/assets/js',
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.html$/,
				loader: "raw"
			}
		]
	},
	plugins: [
		//минификация JS
		/*		new webpack.optimize.UglifyJsPlugin({
		 compress: {
		 warnings: false
		 }
		 })*/
	],
	profile: true
};