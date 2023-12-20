import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { BuildOptions } from './types/types'
/**
 *  This TypeScript code defines a function called "buildDevServer" that returns a DevServerConfiguration object.
 *  The function takes a "BuildOptions" object as input 
 * and returns a DevServerConfiguration object that includes the following properties: 

* port: The port on which the development server will be hosted. 
* open: Whether or not the development server will automatically open in the browser. 
* historyApiFallback: Whether or not the development server will use the history API fallback. 
* hot: Whether or not the development server will enable hot reloading.
 */
export const buildDevServer = (
	options: BuildOptions
): DevServerConfiguration => {
	return {
		port: options.port ?? 5000,
		open: true,
		//если раздавать статику черех nginx, то надо делать проксирование на index.html
		historyApiFallback: true,
		hot: true,
	}
}
