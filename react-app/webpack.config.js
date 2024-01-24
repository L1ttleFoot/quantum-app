const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = (env) => {

    const isProduction = env.mode === 'production'
    const isDevelopment = env.mode === 'development'

    return {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'build-test'),
            filename: 'static/js/[name].[contenthash:8].js',
            assetModuleFilename: 'static/media/[hash][ext][query]',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin(
                {
                    template: path.resolve(__dirname, 'public', 'index.html'), 
                    favicon:  path.resolve(__dirname, 'public', 'favicon.ico')
                }
            ),
            isDevelopment && new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin({filename: 'static/css/[name].[contenthash:8].css'})
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.(js|jsx|tsx|ts)$/,
                    exclude: /node_modules/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: [
                            '@babel/preset-env', 
                            '@babel/preset-typescript', 
                            ['@babel/preset-react', {runtime:'automatic'}]
                        ]
                      }
                    }
                  },
              /* {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
              }, */
              {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: "css-loader", 
                        options: {
                            modules: {
                                localIdentName: '[local]_[hash:base64:8]'
                            }
                        }
                    }
                ],
              },
              {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
            ],
          },
          resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
          },
          devServer: {
            port: 3001,
            open: true,
            historyApiFallback: true
          }
    }
}