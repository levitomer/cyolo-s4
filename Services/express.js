const express = require('express');
const webpack = require('webpack');
const inquirer = require('inquirer');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackDevConfig = require('../config/webpack.dev.js');
const webpackProdConfig = require('../config/webpack.prod.js');
const webpackCommonConfig = require('../config/webpack.common.js');
const { merge } = require('webpack-merge');

const app = express();

inquirer
    .prompt([
        {
            name: 'env',
            type: 'list',
            message: 'Select webpack build configuration:',
            choices: ['DEVELOPMENT', 'PRODUCTION'],
        },
    ])
    .then(({ env }) => {
        let config;
        let compiler;

        switch (env) {
            case 'DEVELOPMENT':
                config = webpackCommonConfig('development');
                compiler = webpack(config);
                break;
            case 'PRODUCTION':
                config = webpackCommonConfig('production');
                compiler = webpack(config);
                break;
            default:
                config = webpackCommonConfig('development');
                compiler = webpack(config);
        }

        // Tell express to use the webpack-dev-middleware and use the webpack.dev.js
        // configuration file as a base.
        app.use(
            webpackDevMiddleware(compiler, {
                publicPath: config.output.publicPath,
            })
        );

        // Serve the files on port 3000.
        app.listen(3000, function () {
            console.log('Server is listening on port 3000!\n');
        });
    })
    .catch((error) => {
        console.error('Something went wrong, contact Tomer...', error);
    });
