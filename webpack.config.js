var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');  //this is required for HMR
var path = require('path');

let isProd = process.env.ENV === 'prod' ? true : false;
let cssDev = [ "style-loader","css-loader"];
let cssProd = ExtractTextPlugin.extract({   //HMR doesnt work with ExtractTextPlugin
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath: "/dist"
                });

module.exports = {
    entry:{ 
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js' //[name] refer to properties on entry object
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use: isProd ? cssProd : cssDev,
            },
            {
                test:/\.js$/,
                exclude: /node_module/,
                use: "babel-loader"
            },
            {
                test:/\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                exclude: /node_module/,
                use: [
                    "file-loader?name=[name].[ext]&outputPath=images/",
                    "image-webpack-loader" //Optimize images befores load
                ]
            }
        ]
    },
    devServer:{
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        //port: 9000,
        stats: "errors-only",
        hot: true  //enable hot module replacement(HMR)
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Fullstack Labs',
           //minify:{
           // collapseWhitespace: true
           // },
            hash: true,
            template: "./src/index.html"
        }),
        new ExtractTextPlugin({
            filename: "app.bundle.css",
            disable: !isProd, //This flag must be true with HMR
            allChunks: true  
        }),
        new webpack.HotModuleReplacementPlugin(), // this two modules allow HMR
        new webpack.NamedModulesPlugin()           //
    ],
    externals: {
        cheerio: 'window',
        'react/addons': 'react',
        'react/lib/ExecutionEnvironment': 'react',
        'react/lib/ReactContext': 'react',
      },
}