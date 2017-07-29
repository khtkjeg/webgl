//var webpack = require('webpack');
var refPath = __dirname + "/ref";

module.exports = {
    entry: {
        entry: "./js/entry.js"
    },
    output: {
        path: __dirname + "/",
        filename: "[name].bundle.js"
    },
    // module: {
    //     loaders: [{
    //         test: /\.jsx?$/,
    //         loader: 'babel'
    //     }]
    // },
    // resolve: {
    //     alias: {
    //         bootstrap: refPath + "/bootstrap.min"
    //     }
    // },
    // externals: {
    //     TWEEN: true
    // },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin()
        // new webpack.ResolverPlugin(
        //     new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        // )
    ]
};