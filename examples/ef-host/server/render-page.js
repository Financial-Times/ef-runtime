import ReactDOM from 'react-dom/server';

/**
 * helper function to render a React component and send it as the HTTP response
 */
export default function renderPage (response, document) {
	response.send('<!DOCTYPE html>' + ReactDOM.renderToStaticMarkup(document));
};
