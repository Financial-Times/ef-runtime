import { ComponentRegistry } from "./ComponentRegistry";
import { ModuleLoader, IModuleLoaderDependencies } from "./ModuleLoader";
import { EFRuntime, IRuntimeDependencies } from "./EFRuntime";

const registryDependencies = {
  registryURL: "http://localhost:3003",
};

const registry = new ComponentRegistry(registryDependencies);

const moduleLoaderDependencies: IModuleLoaderDependencies = {
  document: document,
  loaderSrc:
    "https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.14.2/system.min.js",
};

const moduleLoader = new ModuleLoader(moduleLoaderDependencies);

const runtimeDependencies: IRuntimeDependencies = {
  componentRegistry: registry,
  moduleLoader: moduleLoader,
  document: document,
};

const runtime = new EFRuntime(runtimeDependencies);

export async function init(options: {
  systemCode?: string;
  overrides?: { [propName: string]: string };
}) {
  await runtime.init(options);
}
