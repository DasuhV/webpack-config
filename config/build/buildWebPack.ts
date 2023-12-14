import path from 'path'
import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import { BuildOptions } from './types/types'
import webpack from 'webpack'

export const buildWebPack = (options:BuildOptions):webpack.Configuration => {
	return {
		mode: options.mode ?? 'development',
		entry: options.paths.entry,
		output: {
			path: options.paths.output,
			filename: '[name].[contenthash].js',
			clean: true,
		},
		plugins: buildPlugins(options),
		//loader'ы
		module: {
			rules: buildLoaders(options),
		},
		resolve: buildResolvers(),
		devtool: 'inline-source-map',
		devServer: buildDevServer(options),
	}
}	
