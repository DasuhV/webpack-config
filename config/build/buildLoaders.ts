import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { ModuleOptions } from 'webpack'
import { BuildOptions } from './types/types'
import ReactRefreshTypeScript from 'react-refresh-typescript'
import { buildBabelLoader } from './babel/buildBabelLoader'
/**
 * This TypeScript code defines a function called "buildLoaders" that returns an array of loaders for use with Webpack. 
 * The function takes a "BuildOptions" object as input 
 * and returns an array of loaders that are used to compile the project's assets, including images, SVGs, and CSS.
 * The function also includes a loader for TypeScript files 
 * that uses the ReactRefreshTypeScript transformer to enable hot reloading in development.
 * 
 * Also we can work with not only with babel we can try:
 * swc(speedy web compiler) loader
 * or esbuild loader
 */
export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
	const isDev = options.mode === 'development'

	//compiles images
	const assetLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource',
	}
	//compiles svg
	const svgrLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
		use: [
			{
				loader: '@svgr/webpack',
				options: {
					icon: true,
					svgoConfig: {
						plugins: [
							{
								name: 'convertColors',
								params: {
									currentColor: true,
								},
							},
						],
					},
				},
			},
		],
	}
	//compiles styles
	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			// Creates `style` nodes from JS strings
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			// Translates CSS into CommonJS
			{
				loader: 'css-loader',
				// option for  css module
				options: {
					modules: {
						localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
					},
				},
			},
			// Compiles Sass to CSS
			'sass-loader',
		],
	}
	//compiles ts,tsx and jsx
	const tsLoader = {
		test: /\.tsx?$/,
		use: [
			{
				loader: 'ts-loader',
				options: {
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
					}),
					transpileOnly: true,
				},
			},
		],
		exclude: /node_modules/,
	}

	//compiles tsx,react,and creating an abstract syntax tree(ast)
	const babelLoader = buildBabelLoader(options)
	
	return [
		assetLoader,
		scssLoader,
		//tsLoader,
		babelLoader,
		svgrLoader]
}
