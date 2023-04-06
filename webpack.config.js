const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    //entry: path.resolve(__dirname, './src/index.js'),
    entry: {
        app: {
            import: path.resolve(__dirname, 'src/app.js'),
        },
        index: {
            import: path.resolve(__dirname, 'src/pages/index.js'),
        },
        page2: {
            import: path.resolve(__dirname, 'src/pages/page2.js'),
        },
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/templates", "index.html"),
            filename: 'index.html',
            chunks: ['app', 'index']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/templates", "page2.html"),
            filename: 'page2.html',
            chunks: ['app', 'page2']
        }),
        new MiniCssExtractPlugin(),
    ],
    devServer: {
        static: path.resolve(__dirname, './dist'),
        hot: true,
        open: true,
        watchFiles: ['src/**/*'],
    },
};