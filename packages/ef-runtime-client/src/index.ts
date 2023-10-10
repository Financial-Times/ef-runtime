import { ComponentRegistry } from "./ComponentRegistry";
import { SystemJSLoader } from "./SystemJSLoader";
import { EFRuntime, IRuntimeDependencies } from "./EFRuntime";

const registry = new ComponentRegistry();

const runtimeDependencies: IRuntimeDependencies = {
  componentRegistry: registry,
  systemJSLoader: SystemJSLoader,
  document: document,
};

const runtime = new EFRuntime(runtimeDependencies);

export async function init(options: {
  systemCode?: string;
  overrides?: { [propName: string]: string };
}) {
  await runtime.init(options);
}
