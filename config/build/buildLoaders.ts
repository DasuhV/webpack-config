import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { ModuleOptions } from 'webpack'
import { BuildOptions } from './types/types'

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
	const isDev = options.mode === 'development'
	
	const cssModuleLoader = {
		test: /\.css$/i,
		loader: 'css-loader',
		options: {
			modules: {
				localIdentName:  '[path][name]__[local]',
			},
		},
	}
	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			// Creates `style` nodes from JS strings
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			// Translates CSS into CommonJS
			{
				loader: 'css-loader',
				options: {
					modules: {
						localIdentName: isDev? '[path][name]__[local]':'[hash:base64:8]',
					},
				},
			},
			// Compiles Sass to CSS
			'sass-loader',
		],
	}
	const tsLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	}
	return [  scssLoader, tsLoader ]
}
