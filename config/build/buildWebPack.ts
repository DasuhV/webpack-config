import path from 'path'
import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import { BuildOptions } from './types/types'
import webpack from 'webpack'

/**
 * This code exports a function named "buildWebPack" which takes in an object of type "BuildOptions" as a parameter.
 * It checks if the mode in the options is set to "development" to determine if it is in development mode.
 * It then returns a webpack configuration object with various properties such as 
 * mode, entry, output, plugins, module, resolve, devtool, and devServer.
 * The values for these properties are built using helper functions such as 
 * "buildPlugins", "buildLoaders", "buildResolvers", and "buildDevServer" which are not shown in the provided code.
 */
export const buildWebPack = (options: BuildOptions): webpack.Configuration => {
	const isDev = options.mode === 'development'
	
	return {
		mode: options.mode ?? 'development',
		entry: options.paths.entry,
		output: {
			path: options.paths.output,
			filename: '[name].[contenthash].js',
			clean: true,
		},
		plugins: buildPlugins(options),
		module: {
			rules: buildLoaders(options),
		},
		resolve: buildResolvers(options),
		devtool: 'inline-source-map',
		devServer: isDev ? buildDevServer(options) : undefined,
	}
}	
