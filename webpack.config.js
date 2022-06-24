const path = require('path'); //path del proyecto principal
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js', // punto de entrada
    output: { // lugar al que saldrán todos los archivos
        path: path.resolve(__dirname, 'dist'), //en nuestro path, crea la carpeta dist
        filename: 'bundle.js',
        publicPath:'/' // nombre del archivo js resultante
    },
    resolve: { // extensión de archivos a tomar en cuenta
        extensions: ['.js', '.jsx'],
        alias: {
            'Components': path.resolve(__dirname, 'src/components/'),
            'Styles': path.resolve(__dirname, 'src/styles/')
          }
    },
    mode: 'production',
    module: { // loaders para cada tipo de archivo
        rules: [ // reglas para usar
            {
                test: /\.(js|jsx)$/, // extensiones en las cuales actuará babel
                exclude: /node_modules/, // siempre excluir node modules 
                use: { // indicamos el loader
                    loader: 'babel-loader' // babel 
                }
            },
            {
                test: /\.html$/, // extensiones html
                use: [
                    {
                        loader: 'html-loader' // loader para usar
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use:[MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
        ]
    },
    plugins: [ // plugins 
        new HtmlWebpackPlugin({ // instanciamos el plugin para html 
            template: './public/index.html', // archivo raíz a transformar
            filename: './index.html' // el archivo resultante
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin(),
        ]
      }
}