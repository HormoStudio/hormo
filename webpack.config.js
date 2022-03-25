const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin').default;

module.exports = (env, args) => {
    const envVariables = {
        ...Object.keys(process.env).reduce((acc, key) => {
            if (key.startsWith('REACT_')) {
                acc[key] = process.env[key];
            }
            return acc;
        }, {}),
        NODE_ENV: args.mode,
        PUBLIC_URL: '',
    };
    return {
        mode: args.mode,
        entry: {
            app: [
                ...(args.mode !== 'production' ? ['webpack-hot-middleware/client?path=/__webpackhmr&timeout=20000&reload=true'] : []),
                path.resolve(__dirname, 'src/index.tsx'),
            ]
        },
        resolve: {
            plugins: [new TsconfigPathsPlugin()],
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?/,
                    exclude: /node_modules/,
                    use: ['ts-loader'],
                },
                {
                    test: /\.(svg|webp|png|jpeg|gif|bmp|jpg)$/i,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images',
                            }
                        }
                    ]
                },
                {
                    test: /\.(ttf|eot|woff2|woff)$/i,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'fonts',
                            }
                        }
                    ]
                },
                {
                    test: /\.(sass|scss|css)$/,
                    use: [
                        args.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        require('autoprefixer')(),
                                    ]
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    includePaths: [path.resolve(__dirname, 'src')],
                                },
                                additionalData: '@import "variables";'
                            }
                        }
                    ],
                }
            ]
        },
        target: 'web',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js',
            publicPath: '',
        },
        devtool: args.mode !== 'production' ? 'inline-source-map' : 'none',
        plugins: args.mode !== 'production' ? [
            new webpack.EnvironmentPlugin(envVariables),
            new webpack.HotModuleReplacementPlugin(),
        ] : [
                new webpack.EnvironmentPlugin(envVariables),
                new MiniCssExtractPlugin({
                    filename: '[name].css',
                }),
            ]
    }
};