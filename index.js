const path = require('path');
const express = require('express');
const app = express();
const config = require('./config.json');
const winston = require('winston');

const PORT = process.env.PORT || config.server.port;

process.env.NODE_ENV = config.mode;
app.use(require('morgan')(config.server.morgan));
app.use(require('compression')());
app.use(require('serve-static')(path.join(__dirname, config.server.static)));
app.use(express.static('public'));



if (config.mode === 'development') {
    const config = require('./webpack.config');
    const compiler = require('webpack')(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'), function(err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

require('http').createServer(app).listen(
    PORT,
    () => winston.info('Server started at port %s', config.server.port)
);
