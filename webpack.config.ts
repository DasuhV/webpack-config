import path from 'path'
import webpack from 'webpack'

import { buildWebPack } from './config/build/buildWebPack'
import { BuildMode, BuildPaths } from './config/build/types/types'

export interface EnvVariables {
	mode: BuildMode
	port: number
	analyzer?:boolean
}

export default (env: EnvVariables) => {
	const paths: BuildPaths = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		output: path.resolve(__dirname, 'build'),
		src: path.resolve(__dirname, 'src'),
	}
	const config: webpack.Configuration = buildWebPack({
		port: env.port ?? 5000,
		mode: env.mode ?? 'development',
		paths,
		analyzer:env.analyzer,
	})
	return config
}
