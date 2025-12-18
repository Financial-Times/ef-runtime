import { ComponentRegistry } from "./ComponentRegistry";
import { ModuleLoader } from "./ModuleLoader";
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
  efFlag?: "on" | "prod" | "staging";
  overrides?: { [propName: string]: { js: string; css: string } };
  logging?: ILoggingOptions;
}) {
  validateLoggingOptions(options.logging);

  const logger = new Logger(options.logging);

  const registry = new ComponentRegistry({
    registryURL:
      options.efFlag === "staging"
        ? "https://ef-component-registry-staging.in.ft.com/"
        : "https://ef-component-registry.in.ft.com/",
    logger: logger,
  });

  const moduleLoader = new ModuleLoader();

  const stylingHandler = new StylingHandler(document, logger);

  const runtimeDependencies: IRuntimeDependencies = {
    componentRegistry: registry,
    moduleLoader: moduleLoader,
    stylingHandler: stylingHandler,
    document,
    logger: logger,
    localStorage: window.localStorage,
  };

  const runtime = new EFRuntime(runtimeDependencies);

  try {
    await runtime.init(options);
  } catch {
    logger.error(`Failed to initialise runtime`);
  }

  // Initialize UI only if on localhost and when efui localStorage key is set to true
  if (
    location.hostname.match("local") &&
    localStorage.getItem("efui") === "true"
  )
    UI.init(registry);
}
