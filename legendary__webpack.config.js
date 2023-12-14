import path from 'path'
import webpack from 'webpack'
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server'

// const path = require('path')
// //plugins
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack') //to access built-in plugins

// module.exports =  { // если нет динамического переключения переменными окружения то здесь будет обьект
module.exports = env => {
	// принимает в параметры переменные окружения env
	return {
		mode: env.mode ?? 'development',
		//mode: 'development', // указывает в каком режиме будет выполнена сборка
		//для нескольких точек входа в сборке
		// entry: {
		// 	helloWorld: path.resolve(__dirname, 'src', 'index.js')
		// }
		// для одной точки
		//path.resolve метод преобразует последовательность путей или сегментов пути
		//в абсолютный путь
		entry: path.resolve(__dirname, 'src', 'index.ts'),
		output: {
			path: path.resolve(__dirname, 'build'), //путь и папка куда создавать файл сборки
			// filename: 'bundle.js', // имя файла сборки
			// clean: true, // позволяет очищать папку <build> перед новой сборкой
			//лучше не делать статичные пути и имена а использовать динамичные.
			//аттрибуты можно посмотреть в документации https://webpack.js.org/configuration/output/#template-strings
			filename: '[name].[contenthash].js',
			clean: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'public', 'index.html'),
			}), // узнает HTML
			new webpack.ProgressPlugin(), //показывает в процентах прогресс сборки
		],
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
	}
}
