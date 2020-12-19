import path from "path";

import webpack from "webpack";
import VueLoaderPlugin from "vue-loader/lib/plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

export default {
    // mode: "production",
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        main: "./src/main.ts",
        inject: "./src/inject.ts",
        content: "./src/content.ts",
        background: "./src/background.ts",
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: `[name].js`,
    },
    module: {
        rules: [
            //webpack本身就可以识别js文件，所以不需要额外定义规则
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
            {
                test: /\.tsx?$/,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    "postcss-loader",
                ],
            },
            {
                test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)$/i,
                use: [{ loader: "url-loader" }],
            },
            {
                test: /\.vue$/,
                use: "vue-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        // 使用webpack打包vue文件，必须需要这个插件
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new CopyPlugin({
            patterns: [
                { from: "manifest.json", to: "" },
                { from: "assets/icon.png", to: "" },
            ],
        }),
        new webpack.EnvironmentPlugin({
            CRX: true,
            LITE: true,
        }),
    ],
    resolve: {
        //import的时候，可以不用写扩展名
        extensions: [".ts", ".js", ".vue", ".json"],
        alias: {
            "@src": path.resolve(__dirname, "./src/"),
            "@utils": path.resolve(__dirname, "./src/utils/"),
            "@assets": path.resolve(__dirname, "./assets/"),
            "@plugins": path.resolve(__dirname, "./src/plugins/"),
        },
    },
};
