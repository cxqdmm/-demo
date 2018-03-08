

require('babel-register')

const webpack = require('webpack');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// var cookieParser = require('cookie-parser');
const config = require('./webpack.config');


const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;

//

/* GET home page. */



const app = express();



// Webpack developer
if (isDeveloping) {
    const compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true
    }));

    //app.use(require('webpack-hot-middleware')(compiler));
}

//  RESTful API
const publicPath = path.resolve(__dirname,'webapp');
app.use(bodyParser.json({
    type: 'application/json'
}))
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname,'index.html'));
});
app.get('/fly', function (req, res) {
    res.sendFile(path.resolve(__dirname,'fly.html'));
});


const port = isProduction ? (process.env.PORT || 80) : 4002;

app.listen(port, function(err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Server running on port ' + port);
});

