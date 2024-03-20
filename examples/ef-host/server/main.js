import express from '@financial-times/n-express';
import createErrorLogger from '@dotcom-reliability-kit/middleware-log-errors';
import { init as navigationMiddleware } from '@financial-times/dotcom-middleware-navigation';
import { init as assetLoaderMiddleware } from '@financial-times/dotcom-middleware-asset-loader';
import React from 'react';
import { environment, systemCode } from '@dotcom-reliability-kit/app-info';
import renderErrorInfoPage from '@dotcom-reliability-kit/middleware-render-error-info';
import renderPage from './render-page';

import { Shell } from '@financial-times/dotcom-ui-shell';
import { Layout } from '@financial-times/dotcom-ui-layout';
import MainPage from '../views/main';

/**
 * Create a new instance of @financial-times/n-express.
 *
 * @see https://github.com/Financial-Times/n-express
 */
const app = express({
	systemCode,
	demo: true,
	withBackendAuthentication: false
});

/**
 * Page Kit middleware for the UI components
 *
 * @see https://github.com/Financial-Times/dotcom-page-kit/blob/HEAD/packages/dotcom-middleware-navigation
 * @see https://github.com/Financial-Times/dotcom-page-kit/blob/HEAD/packages/dotcom-middleware-asset-loader
 */
app.use(
	navigationMiddleware(),
	assetLoaderMiddleware({
		// in production, assets are hosted on S3. in development, this app will need to serve them.
		hostStaticAssets: true,
		publicPath:'/__dev/assets/__app__',
	})
);

/**
 * Serve a __gtg endpoint. The headers defined here are required by the spec.
 * @see https://docs.google.com/document/d/11paOrAIl9eIOqUEERc9XMaaL3zouJDdkmb-gExYFnw0/edit
 */
app.get('/__gtg', (req, res) => {
	res.set('Cache-Control', 'no-cache');
	res.set('Content-Type', 'text/plain');
	res.status(200).end();
});

app.get('/', (req, res) => {
	/**
	 * get public URLs for the files output by the Page Kit build
	 * @see https://github.com/Financial-Times/dotcom-page-kit/blob/HEAD/packages/dotcom-server-asset-loader
	 */
	const scripts = res.locals.assetLoader.getScriptURLsFor('scripts');
	const stylesheets = [
		...res.locals.assetLoader.getStylesheetURLsFor('styles'),
		...res.locals.assetLoader.getStylesheetURLsFor('page-kit-layout-styles'),
	];

	renderPage(
		res,
		/**
		 * the Page Kit Shell renders the non-visible parts of the page, including metadata and resources
		 * @see https://github.com/Financial-Times/dotcom-page-kit/blob/HEAD/packages/dotcom-ui-shell
		 */
		<Shell
			pageTitle='FT.com template app'
			scripts={scripts}
			stylesheets={stylesheets}
		>
			{/**
			 * the Page Kit Layout renders non-content parts of the page, e.g. header & footer (using navigation data)
			 * @see https://github.com/Financial-Times/dotcom-page-kit/blob/HEAD/packages/dotcom-ui-layout
			 */}
			<Layout navigationData={res.locals.navigation}>
				<MainPage />
			</Layout>
		</Shell>
	);
});

/**
 * Reliability Kit middleware for logging errors.
 * Note: this must be added AFTER all your application routes
 *
 * @see https://github.com/Financial-Times/dotcom-reliability-kit/blob/HEAD/packages/middleware-log-errors
 */
app.use(createErrorLogger());

/**
 * The renderErrorInfoPage function helps debugging by rendering detailed
 * error pages while the app is running locally. It must be added to your
 * Express app after all your application routes.
 *
 * @see https://github.com/Financial-Times/dotcom-reliability-kit/tree/main/packages/middleware-render-error-info
 */
app.use(renderErrorInfoPage());

export default app;
