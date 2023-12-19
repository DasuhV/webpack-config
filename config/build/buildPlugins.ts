import HtmlWebpackPlugin from 'html-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import path from 'path'
import webpack, { Configuration, DefinePlugin }  from 'webpack'
import { BuildOptions } from './types/types'

export const buildPlugins = (options: BuildOptions): Configuration['plugins'] => {
	const isDev = options.mode === 'development'
	return [
		//For html
		new HtmlWebpackPlugin({
			template: options.paths.html,
		}),
		//for variables
		new webpack.DefinePlugin({
			__PLATFORM__: JSON.stringify(options.platform),
		}),
		//for ts checking (распараллелили сборки и проверку типов)
		new ForkTsCheckerWebpackPlugin(),
		//For css
		!isDev &&
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css',
			}),
		// bundle analyzer
		options.analyzer && new BundleAnalyzerPlugin(),
		//progressplagin замедляет сборку
		isDev && new webpack.ProgressPlugin(),
	].filter(Boolean)
}
