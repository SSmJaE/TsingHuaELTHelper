import * as fs from "fs";

import webpack from "webpack";
import { merge } from "webpack-merge";
import common from "./webpack.common.babel.js";

export default merge(common, {
    mode: "production",
    optimization: {
        minimize: false,
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            CRX: false,
            LITE: true,
        }),
        new webpack.BannerPlugin({
            banner: fs.readFileSync("./docs/LITE/headers.js", "utf8"),
            raw: true,
            entryOnly: true,
        }),
    ],
    externals: {
        vue: "Vue",
        $: "jQuery",
        "crypto-js": "CryptoJS",
    },
});
