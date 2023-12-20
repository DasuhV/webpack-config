//plugins
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { Configuration, DefinePlugin, ProgressPlugin } from 'webpack'
import { BuildOptions } from './types/types'
import path from 'path'
/**
 * TypeScript code from file buildPlugins.ts.
 * This code exports a function named buildPlugins which takes a BuildOptions object as a parameter and returns an array of plugins for webpack configuration.
 * The function checks if the mode is development and based on that, it adds different plugins to the array.
 * The plugins include HtmlWebpackPlugin for generating HTML files, DefinePlugin for defining platform variables,
 *  ForkTsCheckerWebpackPlugin for TypeScript type checking, ReactRefreshWebpackPlugin for hot module replacement,
 *  CopyPlugin for copying files into the final build, MiniCssExtractPlugin for extracting CSS files,
 *  BundleAnalyzerPlugin for bundle analysis, and ProgressPlugin for showing build progress.
 */
export const buildPlugins = (
	options: BuildOptions
): Configuration['plugins'] => {
	const isDev = options.mode === 'development'
	return [
		//For html and favicon
		new HtmlWebpackPlugin({
			template: options.paths.html,
			favicon: options.paths.publicIcon,
		}),
		//for variables
		new DefinePlugin({
			__PLATFORM__: JSON.stringify(options.platform),
		}),
		//for ts checking (распараллелили сборки и проверку типов)
		new ForkTsCheckerWebpackPlugin(),
		// for hot module replacment
		new ReactRefreshWebpackPlugin(),
		// to copy files into the final build
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(options.paths.public, 'locale'),
					to: path.resolve(options.paths.output, 'locale'),
				},
			],
		}),
		//For css
		!isDev &&
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css',
			}),
		// bundle analyzer
		options.analyzer && new BundleAnalyzerPlugin(),
		//ProgressPlagin shows bulding progress as a percentage. он замедляет сборку
		isDev && new ProgressPlugin(),
	].filter(Boolean)
}
