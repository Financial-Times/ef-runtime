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

## Running Tests

Execute the test suite with the following command:

```bash
npm test
```

## FAQ
