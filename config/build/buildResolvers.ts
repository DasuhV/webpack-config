import { Configuration } from 'webpack'
import { BuildOptions } from './types/types'
/**
 * This code defines the buildResolvers function, 
 * which takes in options of type BuildOptions and returns a Configuration object.
 * The function sets the extensions for resolving files to ['.tsx', '.ts', '.js'] 
 * and creates an alias for the '@' path, which points to the options.paths.src value.
 */

export const buildResolvers = (options:BuildOptions): Configuration['resolve'] => {
	return {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@': options.paths.src,
		},
	}
}
