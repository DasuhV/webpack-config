import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
//types for dev-server
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

type Mode = 'development' | 'production'
interface EnvVariables {
	mode: Mode
	port: number
}

export default (env: EnvVariables) => {
	//checking mode type to switch settings
	const isDev = env.mode === 'development'

	const config: webpack.Configuration = {
		mode: env.mode ?? 'development',
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].[contenthash].js',
			clean: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'public', 'index.html'),
			}),
			//progressplagin замедляет сборку
			isDev && new webpack.ProgressPlugin(),
		].filter(Boolean),
		//loader'ы
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: [
						// Creates `style` nodes from JS strings
						'style-loader',
						// Translates CSS into CommonJS
						'css-loader',
						// Compiles Sass to CSS
						'sass-loader',
					],
				},
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
		devtool: 'inline-source-map',
		devServer: isDev
			? {
					port: env.port ?? 5000,
					open: true,
			  }
			: undefined,
	}
	return config
}
