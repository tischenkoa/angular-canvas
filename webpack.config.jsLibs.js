// для добавление библиотеки добавим ее в vendor и  noParse
var webpack = require('webpack');

module.exports = {
	entry: {
		vendor: [
			"angular"
		]
	},
	output: {
		path: './build/assets/js',
		filename: "bundle.js"
	},
	module: {
		noParse: /\/node_modules\/(angular\/angular)/
	},
	profile: true
};