const path = require('path');
const webpack = require('webpack');


module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'babel-polyfill',
		'webpack-hot-middleware/client',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
		publicPath: '/'
	},
	plugins: [
		/**
		 * This is where the magic happens! You need this to enable Hot Module Replacement!
		 */
		new webpack.HotModuleReplacementPlugin(),
		/**
		 * NoEmitOnErrorsPlugin prevents your webpack CLI from exiting with an error code if
		 * there are errors during compiling - essentially, assets that include errors
		 * will not be emitted. If you want your webpack to 'fail', you need to check out
		 * the bail option.
		 */
		new webpack.NoEmitOnErrorsPlugin(),
		/**
		 * DefinePlugin allows us to define free variables, in any webpack build, you can
		 * use it to create separate builds with debug logging or adding global constants!
		 * Here, we use it to specify a development build.
		 */
		// new webpack.DefinePlugin({
		//   'process.env.NODE_ENV': JSON.stringify('development')
		// }),

	],
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			include: path.join(__dirname, 'src')
		}, {
			test: /\.json$/,
			loader: 'json-loader',
			include: path.join(__dirname, 'data')
		}, {
			test: /\.scss$/,
			loader: 'style-loader!css-loader?modules&sourceMap&localIdentName=[name]-[local]!sass-loader?sourceMap',
			include: path.join(__dirname, 'src')
		}, {
			test: /\.css$/,
			loader: 'style-loader?insertAt=top!css-loader',
			include: [
				path.join(__dirname, 'src'),
				path.join(__dirname, 'node_modules', 'normalize.css')
			]
		}]
	}
}
