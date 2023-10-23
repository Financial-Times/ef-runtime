import { ComponentRegistry } from "./ComponentRegistry";
import { ModuleLoader, IModuleLoaderDependencies } from "./ModuleLoader";
import { EFRuntime, IRuntimeDependencies } from "./EFRuntime";
import { StylingHandler } from "./StylingHandler";

const registryDependencies = {
  registryURL: "https://ef-component-registry-51742754f2eb.herokuapp.com",
};

const registry = new ComponentRegistry(registryDependencies);

const moduleLoaderDependencies: IModuleLoaderDependencies = {
  document: document,
  loaderSrc:
    "https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.14.2/system.min.js",
};

const moduleLoader = new ModuleLoader(moduleLoaderDependencies);

const stylingHandler = new StylingHandler(document);

const runtimeDependencies: IRuntimeDependencies = {
  componentRegistry: registry,
  moduleLoader: moduleLoader,
  stylingHandler: stylingHandler,
};

const runtime = new EFRuntime(runtimeDependencies);

export async function init(options: {
  systemCode: string;
  overrides?: { [propName: string]: { js: string; css: string } };
}) {
  await runtime.init(options);
}
