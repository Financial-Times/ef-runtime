import { ComponentRegistry } from "./ComponentRegistry";
import { ModuleLoader, IModuleLoaderDependencies } from "./ModuleLoader";
import { EFRuntime, IRuntimeDependencies } from "./EFRuntime";
import { StylingHandler } from "./StylingHandler";
import { Logger } from "./Logger";
import UI from "./ui";

interface ILoggingOptions {
  [key: string]: ((message: string, ...args: any[]) => void) | undefined;
  info?: (message: string, ...args: any[]) => void;
  warn?: (message: string, ...args: any[]) => void;
  error?: (message: string, ...args: any[]) => void;
  debug?: (message: string, ...args: any[]) => void;
}

function validateLoggingOptions(logging?: ILoggingOptions): void {
  if (!logging) return;

  const loggingMethods = ["info", "warn", "error", "debug"];
  loggingMethods.forEach((method) => {
    if (
      logging[method] !== undefined &&
      typeof logging[method] !== "function"
    ) {
      throw new Error(
        `Logging method '${method}' must be a function or undefined.`
      );
    }
  });
}

export async function init(options: {
  systemCode: string;
  overrides?: { [propName: string]: { js: string; css: string } };
  logging?: ILoggingOptions;
}) {
  validateLoggingOptions(options.logging);

  const logger = new Logger(options.logging);

  const registry = new ComponentRegistry({
    registryURL: "https://ef-component-registry-51742754f2eb.herokuapp.com",
    logger: logger,
  });

  const moduleLoaderDependencies: IModuleLoaderDependencies = {
    document: document,
    loaderSrc:
      "https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.14.2/system.min.js",
    registry: registry,
    logger: logger,
  };

  const moduleLoader = new ModuleLoader(moduleLoaderDependencies);

  const stylingHandler = new StylingHandler(document, logger);

  const runtimeDependencies: IRuntimeDependencies = {
    componentRegistry: registry,
    moduleLoader: moduleLoader,
    stylingHandler: stylingHandler,
    logger: logger,
    localStorage: window.localStorage,
  };

  const runtime = new EFRuntime(runtimeDependencies);

  await runtime.init(options);
  if (location.hostname.match("local")) UI.init(registry);
}
