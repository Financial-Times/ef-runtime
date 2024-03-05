# Extensible Frontends Demo Component with External Dependencies

This is a demo component for the Extensible Frontends project to act as an example of a minimal Extensible-Frontends component. This component uses react as an external dependencies. In other words, the component does not bundle react but expects `react` and `react-dom/client` to be provided by an `importmap`. For example:

```html
<script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@18.2.0",
      "react-dom/client": "https://esm.sh/react-dom@18.2.0/client"
    }
  }
</script>
```

## Webpack config

If you want to exclude dependencies from your bundle, you can use the webpack externals feature. To do so, add the following lines to your `webpack.config.js`:

``` javascript
module.exports = {
  experiments: {
    outputModule: true,
  },
  externalsType: 'module',
  externals: {
    react: 'react',
    'react-dom/client': 'react-dom/client'
  },
  target: ['es6'],
  output: {
    libraryTarget: 'module',
    chunkFormat: 'module'
  }
}
```

## Installation

```shell
git clone https://github.com/Financial-Times/ef-demo-component-ext.git
cd ef-demo-component-ext
npm install
npm run build
```

## Dependencies

- Node.js v18

## Run for Local Development

```shell
npm run dev
```

## Running Tests

```shell
npm test
```

## For Deployment in production

The following command runs a server that provides a `/js` and a `css` endpoint required by the `extensible-frontends` runtime and `ef-component-registry`.

```shell
npm start
```
