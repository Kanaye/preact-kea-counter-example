const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				options: {
					presets: [
						['env', {
							// let webpack handle module imports
							modules: false
						}],
					],
					plugins: [
						['transform-react-jsx', {
							pragma: 'h'
						}]
					]
				}
			}
		]
	},
	devtool: 'source-map',
	resolve: {
		alias: {
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'preact kea counter example'
		}) // Just generate an index.html for demo purpose
	]
};