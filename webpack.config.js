var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var entry = [
    // "main/index",
    // "fly/index",
    // "tree/index",
    "reactDemo/index",
]
var webpackEntry = {};
entry.forEach(item => {
    webpackEntry[item] = `./src/script/${item}.js`;
});
var config = {
    devtool: "source-map",
    entry: webpackEntry,
    output: {
        path: path.resolve(__dirname, 'webapp/script'),
        filename: '[name].js',
        publicPath: 'http://localhost:4002/script'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ['css-loader?minimize', 'less-loader']
            })
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  'env',
                  'react',
                  'stage-1'],
                  "plugins": ["transform-decorators-legacy"]
              }
            }
          }]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:  (getPath) => {
                if (process.env.NODE_ENV == "production") {
                    return getPath('../css/[name].css').replace('css/js', 'css');
                } else {
                    return getPath('[name].css');
                }
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