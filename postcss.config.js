var config = {
    plugins: [
        // import less postcss对import无效插件
        // require('postcss-import') ({
        //     addDependencyTo: webpack
        // }),
        require('autoprefixer') ({
            browsers: ['last 2 versions', 'iOS >= 7', 'Android >= 4']
        }),
        // require('postcss-cssnext')(),
        // require('cssnano')()
    ]
}

// if (process.env.NODE_ENV != 'beta') {
//     delete config.plugins
// }

module.exports = config