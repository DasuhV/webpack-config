import { PluginItem } from '@babel/core'
/**
 * This  code defines a Babel plugin called "removeDataTestId" that removes JSX identifiers with forbidden props from a program.
 * It utilizes the Babel visitor pattern to traverse the AST and remove the identified JSX identifiers.
 *  The plugin can be used to remove specific props from JSX elements during the Babel transformation process.
 */
export function removeDataTestId(): PluginItem {
	return {
		visitor: {
			Program(path, state) {
				const forbiddenProps = state.opts.props || []
				path.traverse({
					JSXIdentifier(current) {
						const nodeName = current.node.name
						if (forbiddenProps.includes(nodeName)) {
							current.parentPath.remove()
						}
					},
				})
			},
		},
	}
}
