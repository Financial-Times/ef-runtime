import { ComponentRegistry, IComponentInfo } from "./ComponentRegistry";
import { ModuleLoader } from "./ModuleLoader";
import { EFRuntime, IRuntimeDependencies } from "./EFRuntime";
import { StylingHandler } from "./StylingHandler";

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
  overrides?: { [propName: string]: IComponentInfo };
}) {
  await runtime.init(options);
}
