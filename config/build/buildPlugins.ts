import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import webpack, { Configuration }  from 'webpack'
import { BuildOptions } from './types/types'

export const buildPlugins = (options: BuildOptions): Configuration['plugins'] => {
	const isDev = options.mode === 'development'
	return [
		//For html
		new HtmlWebpackPlugin({
			template: options.paths.html
		}),
		//For css
		!isDev &&
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash].css',
				chunkFilename: 'css/[name].[contenthash].css',
			}),
		//progressplagin замедляет сборку
		isDev && new webpack.ProgressPlugin(),
	].filter(Boolean)
}
