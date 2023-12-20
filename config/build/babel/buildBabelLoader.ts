import { BuildOptions } from '../types/types';
import { removeDataTestId } from './removeDataTestIdBabelPlugin'
/**
 * This TypeScript code defines a function called "buildBabelLoader" that returns a Babel loader configuration object.
 * The function takes a "BuildOptions" object as input and returns a Babel loader configuration object that includes 
 * the following presets: "@babel/preset-env", "@babel/preset-typescript", and "@babel/preset-react".
 * The function also includes a plugin called "removeDataTestId" that removes JSX identifiers with the "data-testId" 
 * prop from the code. The plugin is only included in the production build
 */
export const buildBabelLoader = (options: BuildOptions) => {
	const isDev = options.mode === "development"
	return {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: [
					'@babel/preset-env',
					'@babel/preset-typescript',
					['@babel/preset-react', { runtime: 'automatic' }],
				],
				plugins: [
					!isDev && [removeDataTestId,{props:['data-testId']}]
				].filter(Boolean)
			},
		},
	}
}
