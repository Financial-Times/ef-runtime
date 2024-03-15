import * as pageKitLayout from '@financial-times/dotcom-ui-layout';
import readyState from 'ready-state';

// on the client side, these are aliased to Preact
import React from 'react';
import ReactDOM from 'react-dom';

import { TestComponent } from './components/test-component';

import * as EFRuntime from 'ef-runtime-client';

readyState.dom.then(async () => {
	/**
	* initialise the Page Kit layout components, e.g. the menu drawer and sticky heady
	* @see https://github.com/Financial-Times/dotcom-page-kit/blob/HEAD/packages/dotcom-ui-layout
	*/
	pageKitLayout.init();

	await EFRuntime.init({
		systemCode: 'ef-demo-host'
	});

	/**
	 * initialise this app's shared server/client test component
	 */
	const testComponentContainer = document.getElementById('test-component-container');
	ReactDOM.render(<TestComponent where='client' />, testComponentContainer);
});
