// use sucrase to compile (some) ES6+ syntax
require('sucrase/register');

// Start the app
const port = process.env.PORT || 3001;
const app = require('./main').default;

app.listen(port);
