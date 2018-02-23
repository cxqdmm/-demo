var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    devtool: "source-map",
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, 'webapp/script'),
        filename: '[name].js',
        publicPath: 'https://mxfd.vipstatic.com/script/'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ['css-loader?minimize', 'postcss-loader', 'less-loader']
            })
        }, {
            test: /\.js/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-0']
            }
        }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:  (getPath) => {
                return getPath('../css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        })
    ],
    externals: {
        jQuery: 'jQuery',
        zepto: 'zepto'
    }
};

if(process.env.NODE_ENV == "production") {
    delete config.devtool;
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    config.plugins.push(new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }));
}

module.exports = config;