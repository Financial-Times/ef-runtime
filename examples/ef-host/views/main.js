import React from 'react';
import { TestComponent } from '../client/components/test-component';

export default () => (
	<div>
		<h1>Welcome to Extensible Frontends Demo Host App 🏠 👋</h1>
		{/* this ID is used by the client-side code to find the element to render TestComponent into later */}
		<div id='test-component-container'>
			<TestComponent where='server' />
		</div>
		<div id="ef-demo-container"></div>
		<div id="ef-demo-ext-container"></div>
		<div id="ef-demo-vite-container"></div>
	</div>
);
