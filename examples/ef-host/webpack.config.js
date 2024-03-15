const { PageKitBasePlugin } = require('@financial-times/dotcom-build-base');
const { PageKitJsPlugin } = require('@financial-times/dotcom-build-js');
const { PageKitSassPlugin } = require('@financial-times/dotcom-build-sass');
const { PageKitCodeSplittingPlugin } = require('@financial-times/dotcom-build-code-splitting');

module.exports = {
	entry: {
		/**
		 * client-side entry points. the names are used as labels for the Page Kit asset loader
		 * @see https://github.com/Financial-Times/dotcom-page-kit/blob/HEAD/packages/dotcom-server-asset-loader
		 */
		scripts: './client/main.js',
		styles: './client/main.scss',
		'page-kit-layout-styles': require.resolve('@financial-times/dotcom-ui-layout/styles.scss')
	},
	plugins: [
		new PageKitBasePlugin(),
		new PageKitJsPlugin({ jsxPragma: 'React.createElement' }),
		new PageKitSassPlugin({ prependData: '$o-grid-mode: \'snappy\';' }),
		new PageKitCodeSplittingPlugin()
	],
	/**
	 * alias React's packages to Preact for the client-side code
	 * @see https://preactjs.com/guide/v10/getting-started/#aliasing-in-webpack
	 */
	resolve: {
		alias: {
			'react': 'preact/compat',
			'react-dom/test-utils': 'preact/test-utils',
			'react-dom': 'preact/compat'
		}
	}
};
