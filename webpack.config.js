var debug = process.env.NODE_ENV !== "production";
var webpack=require("webpack");
var path=require("path");

module.exports={
	// devServer:{
	// 	historyApiFallback:
	// 	{
	// 		index:"/"
	// 	},
	// },
	context:path.join(__dirname),
	devtool: debug ? "inline-sourcemap" : null,
	entry:"./src/js/index.js",
	module:{
		rules:[{
			test:/\.js?$/,
			exclude:/(node_modules)/,
			loader: "babel-loader",
			query:{
				presets:["react","es2015"],
				plugins:["react-html-attrs"],
			},
			//include:__dirname
		},
		{ test: /\.css$/, loader: "style-loader!css-loader" },
		//{
			//test:/\.css$/,
			//loader:"style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
			//loader: "style-loader!css-loader"
		//}
	]
	},
	output:{
		path:__dirname,
		//publicPath:"/src/",
		filename:"./src/bundle.js"
	},
	plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
}
