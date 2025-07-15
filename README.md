# Extensible Frontends Runtime Client

A runtime library designed to help host apps initialise the runtime on the client-side and dynamically load components from an external component registry.

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Initialisation](#initialisation)
- [Running Tests](#running-tests)
- [FAQ](#faq)

## About

This client-side runtime library is part of the Extensible Frontends project. It enables host applications to initialise a runtime environment that can dynamically load and manage components from an external component registry.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

Install the package using npm or yarn:

```bash
npm install ef-runtime-client
```

## Usage

### Initialisation

To initialise the runtime, provide the system code for your host application:

```js
import * as EFRuntime from "ef-runtime-client";

EFRuntime.init({ systemCode: "ef-demo-host" });
```

If needed, you can override specific entries in the component registry. Specify separate URLs for JavaScript and CSS like so:

```js
EFRuntime.init({
  systemCode: "ef-demo-host",
  overrides: {
    "my-component": {
      js: "http://localhost:3000/my-component.js",
      css: "http://localhost:3000/my-component.css",
    },
  },
});
```

### Using the Extensible Frontends Overrides UI

Instead of modifing the init function in the page's code, you can use the Extensible-Frontends override UI to test your component locally. To do so, You can add the key `efui` to your browser's localStorage manually and set its value to "true" or by running the following command in your browser's console:

``` js
localStorage.setItem("efui", "true")
```

If the `EFUI` button is showing in the page you are developing and you would like to disable it, simple remove the key from your browser's localStorage manually or by running the following command in your browser's console:

``` js
localStorage.removeItem("efui")
```

### Custom Logging

The runtime allows you to implement custom logging. You can utilize this feature to integrate your own logging system or to assist in debugging. Pass a logging object during initialisation with custom functions for `info`, `warn`, `error`, and `debug`.

Here's an example:

```js
EFRuntime.init({
  systemCode: "ef-demo-host",
  logging: {
    info: (message, ...args) => customLogger.info(message, ...args),
    warn: (message, ...args) => customLogger.warn(message, ...args),
    error: (message, ...args) => customLogger.error(message, ...args),
    debug: (message, ...args) => customLogger.debug(message, ...args),
  },
});
```

If you do not provide specific functions, default console methods are used for errors, and other logs are suppressed.

## Running Tests

Execute the test suite with the following command:

```bash
npm test
```

## FAQ
