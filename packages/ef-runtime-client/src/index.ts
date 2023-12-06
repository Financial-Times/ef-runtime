import { ComponentRegistry } from "./ComponentRegistry";
import { ModuleLoader } from "./ModuleLoader";
import { EFRuntime, IRuntimeDependencies } from "./EFRuntime";
import { StylingHandler } from "./StylingHandler";
import UI from "./ui";

const registryDependencies = {
  registryURL: "https://ef-component-registry-51742754f2eb.herokuapp.com",
};

const registry = new ComponentRegistry(registryDependencies);
const moduleLoader = new ModuleLoader();
const stylingHandler = new StylingHandler(document);

const runtimeDependencies: IRuntimeDependencies = {
  componentRegistry: registry,
  moduleLoader: moduleLoader,
  stylingHandler: stylingHandler,
  document: document,
};

const runtime = new EFRuntime(runtimeDependencies);

export async function init(options: {
  systemCode: string;
  overrides?: { [propName: string]: { js: string; css: string } };
}) {
  await runtime.init(options);
  if (location.hostname.match("local")) UI.init(registry);
}
