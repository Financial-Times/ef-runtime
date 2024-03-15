import React from 'react';

/**
 * a component shared between server-side (React) and client-side (Preact) rendering
 */
export const TestComponent = ({ where }) => (
	<h1>I am a test component, rendered on the {where}</h1>
);
