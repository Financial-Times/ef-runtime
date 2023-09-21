const EFRegistry = {};
const EFRegistryBaseURL =
  "https://ef-component-registry-51742754f2eb.herokuapp.com";

function validateOptions(options) {
  if (options.systemCode === undefined) {
    throw new Error("Must provide a 'systemCode' option");
  }
  return true;
}

function initSystemJS() {
  const systemJSScript = document.createElement("script");
  systemJSScript.src =
    "https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.14.2/system.min.js";
  document.head.append(systemJSScript);
}

async function fetchComponentRegistry(systemCode) {
  try {
    const res = await fetch(`${EFRegistryBaseURL}/?app=${systemCode}`);
    const data = await res.json();
    Object.assign(EFRegistry, data.imports);
  } catch (err) {
    console.error(`Unable to fetch Component Registry`);
    console.log(err);
  }
}

export async function init(options = {}) {
  if (!validateOptions(options)) return;

  initSystemJS();

  await fetchComponentRegistry(options.systemCode);

  // Add overrides
  options.overrides &&
    typeof options.overrides == "object" &&
    Object.assign(EFRegistry, options.overrides);

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
