const EFRegistryBaseURL =
  "https://ef-component-registry-51742754f2eb.herokuapp.com";
type EFRegistry = {
  [propName: string]: string
}
const EFRegistry: EFRegistry = {};

async function initSystemJS() {
  return new Promise((resolve, reject) => {
    const systemJSScript = document.createElement("script");
    systemJSScript.addEventListener('load', resolve);
    systemJSScript.addEventListener('error', reject);

    systemJSScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.14.2/system.min.js";
    document.head.append(systemJSScript);
  })
}


function validateOptions(options: any) {
  if (options.systemCode === undefined) {
    throw new Error("Must provide a 'systemCode' option");
  }
  return true;
}

async function fetchComponentRegistry(systemCode: string) {
  try {
    const res = await fetch(`${EFRegistryBaseURL}/?app=${systemCode}`);
    const data = await res.json();
    Object.assign(EFRegistry, data.imports);
  } catch (err) {
    console.error(`Unable to fetch Component Registry`);
    console.log(err);
  }
}

type EFRuntimeOptions = {
  systemCode?: string;
  overrides?: EFRegistry;
}
export async function init(options: EFRuntimeOptions = {}) {
  if (!validateOptions(options)) return;

  // Step 1. Initialise SystemJS and fetch from the registry.
  await Promise.all([
    initSystemJS(),
    fetchComponentRegistry(options.systemCode),
  ]);

  // Add overrides
  options.overrides &&
    typeof options.overrides == "object" &&
    Object.assign(EFRegistry, options.overrides);

  // Step 2. Load all known extensions.
  loadAll();

  // TODO read overrides from config file if exists
}

export function loadAll(): void {
  Object.keys(EFRegistry).forEach(component => load(component));
}

export function load(component: string): void {
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

  // @ts-ignore
  global.System.prepareImport(true);
}
