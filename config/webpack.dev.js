const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    mode: 'development',
    entry: {
        client: './src/index.tsx',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
        ],
    },
    plugins: [
        // new CopyWebpackPlugin([path.resolve(__dirname, 'public/index.html')]),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './pulic/index.html',
        }),
    ],
    devServer: {
        port: 3000,
        hot: true,
    },
    devtool: 'cheap-module-source-map',
};
