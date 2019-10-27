import path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const environment = "development";
const config: webpack.Configuration = {
    mode: environment,
    entry: "./_js/entry.ts",
    devtool: 'source-map',
    output: {
        filename: "./main.js",
        path: path.resolve(__dirname, "./bundle"),
        library: "App"
    },
    stats: {
        errorDetails: true
    },
    resolve: {
        alias: {
            "vue$": environment == "development" ? "vue/dist/vue.esm.js" : "vue/dist/vue.runtime.min.js"
        },
        modules: [
            "node_modules",
        ],
        extensions: [
            ".ts",
            ".js",
            ".vue"
        ]
    },
    context: path.resolve(__dirname, "./"),
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: "ts-loader",
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                }
            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/bundle',
                            hmr: environment === 'development',
                        }
                    },
                    "css-loader",
                    "resolve-url-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        })
    ]
}

export default config;