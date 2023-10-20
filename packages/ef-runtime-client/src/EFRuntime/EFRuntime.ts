import { IComponentRegistry } from "../ComponentRegistry";
import { ModuleLoader } from "../ModuleLoader";
import { StylingHandler } from "../StylingHandler";
import { logger } from "../utils/logger";

export interface IRuntimeDependencies {
  componentRegistry: IComponentRegistry;
  moduleLoader: ModuleLoader;
  stylingHandler: StylingHandler;
}

export class EFRuntime {
  private registry: IComponentRegistry;
  private moduleLoader: ModuleLoader;
  private stylingHandler: StylingHandler;

  constructor({
    componentRegistry,
    moduleLoader,
    stylingHandler,
  }: IRuntimeDependencies) {
    this.registry = componentRegistry;
    this.moduleLoader = moduleLoader;
    this.stylingHandler = stylingHandler;
  }

  private validateOptions(options: {
    systemCode?: string;
    overrides?: { [propName: string]: string };
  }): void {
    if (!options.systemCode) {
      throw new Error("Must provide a systemCode option");
    }
  }

  async init(
    options: {
      systemCode?: string;
      overrides?: { [propName: string]: string };
    } = {}
  ): Promise<void> {
    this.validateOptions(options);

    await Promise.all([
      this.moduleLoader.init(),
      this.registry.fetch(options.systemCode as string),
    ]);

    if (options.overrides) {
      this.registry.applyOverrides(options.overrides);
    }

    this.loadAll();
  }

  loadAll(): void {
    const components = Object.keys(this.registry.getRegistry());
    for (const component of components) {
      this.load(component).catch((error) =>
        logger.error(`Error loading ${component}`, error)
      );
    }
  }

  async load(component: string): Promise<void> {
    const url = this.registry.getURL(component);
    if (!url) {
      logger.error(
        `Component ${component} was not found in the Component Registry`
      );
      return;
    }
    this.stylingHandler.addStyling(url);
    try {
      const componentModule = await this.moduleLoader.importModule(`${url}/js`);
      this.executeLifecycleMethods(componentModule);
    } catch (error) {
      logger.error(
        `Failed to load component ${component} using SystemJS`,
        error
      );
    }
  }

  private async executeLifecycleMethods(componentModule: any): Promise<void> {
    if (componentModule?.init) await componentModule.init();
    if (componentModule?.mount) await componentModule.mount();
  }
}
