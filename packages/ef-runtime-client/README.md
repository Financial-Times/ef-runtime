# Extensible Frontends Runtime Client

Helps host apps initialize the runtime on the client side and load components exisiting in the component registry.

## Usage

### Initialization

```js
import * as EFRuntime from 'ef-runtime-client'

EFRuntime.init({ systemCode: 'ef-demo-host'});
```

or you can override specific entries in the component registry as follows:

```js
EFRuntime.init({
  systemCode: 'ef-demo-host'
  overrides: {
    'my-component': 'http://localhost:3000'
  }
});
```

### Loading a component

```js
EFRuntime.load('my-component');
```
