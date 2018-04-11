import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ReplacePlugin from 'replace-bundle-webpack-plugin-edited';

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: './build',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css', { allChunks: true }),
        new ReplacePlugin([{
            pattern: /throw\s+(new\s+)?[a-zA-Z]+Error\s*\(/g,
            replacement: () => 'return;('
        }])
    ],
    devtool: 'source-map',
    devServer: {
        port: process.env.PORT || 8080,
        contentBase: './src'
    }
};