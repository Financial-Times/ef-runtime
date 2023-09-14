const EFRegistry = {};

export function init(overrides = {}) {
  // Add SystemJS script tag
  const systemJSScript = document.createElement("script");
  systemJSScript.src =
    "https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.14.2/system.min.js";
  document.head.append(systemJSScript);

  // TODO fetch from component registry

  // Add overrides
  Object.assign(EFRegistry, overrides);

  // TODO read overrides from config file if exists
}

export function load(component) {
  const componentURL = EFRegistry[component];

  if (componentURL === undefined) {
    console.error(
      `Component ${component} was not found in the Component Registry`
    );
    return null;
  }

  // Add Demo Component JS script
  const componentScript = document.createElement("script");
  componentScript.type = "systemjs-module";
  componentScript.src = `${componentURL}/js`;
  document.head.append(componentScript);

  // Add Demo Component CSS
  const componentCSS = document.createElement("link");
  componentCSS.rel = "stylesheet";
  componentCSS.href = `${componentURL}/css`;
  document.head.append(componentCSS);
}
