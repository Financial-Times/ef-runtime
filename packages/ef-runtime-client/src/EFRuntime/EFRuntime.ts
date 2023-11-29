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
    overrides?: { [propName: string]: { js: string; css: string } };
  }): void {
    if (!options.systemCode) {
      throw new Error("Must provide a systemCode option");
    }
  }

  async init(
    options: {
      systemCode?: string;
      overrides?: { [propName: string]: { js: string; css: string } };
    } = {}
  ): Promise<void> {
    this.validateOptions(options);

    await this.registry.fetch(options.systemCode as string);

    if (options.overrides) {
      this.registry.applyOverrides(options.overrides);
    }
    const localOverrides = localStorage.getItem("ef-overrides");
    if (localOverrides) {
      this.registry.applyOverrides(JSON.parse(localOverrides));
    }

    await this.moduleLoader.init();
    this.loadAll();
  }

  async loadAll(): Promise<void> {
    const components = this.registry.getRegistry();
    for (const component in components) {
      this.load(component).catch((error) =>
        logger.error(`Failed to initialise and mount ${component}`, error)
      );
    }
    await Promise.allSettled(
      Object.keys(components).map((component) => this.load(component))
    );
  }

  async load(component: string): Promise<void> {
    const urlInfo = this.getComponentURL(component);
    if (!urlInfo) return;

    const { js, css } = urlInfo;
    if (!this.isValidURL(js, css, component)) return;

    await this.loadComponent(js, css, component);
  }

  private getComponentURL(component: string) {
    const urlInfo = this.registry.getComponentInfo(component);
    if (!urlInfo) {
      console.error(`Failed to retrieve URL for component ${component}`);
    }
    return urlInfo;
  }

  private isValidURL(
    js: string | null,
    css: string | null,
    component: string
  ): boolean {
    let isValid = true;
    let missingParts: string[] = [];

    if (!js) {
      missingParts.push("JS");
      isValid = false;
    }

    if (!css) {
      missingParts.push("CSS");
      isValid = false;
    }

    if (!isValid) {
      console.error(
        `Missing ${missingParts.join(" and ")} URL for component ${component}`
      );
    }

    return isValid;
  }

  private async loadComponent(js: string, css: string, component: string) {
    this.stylingHandler.addStyling(css);
    try {
      const componentModule = await this.moduleLoader.importModule(js);
      this.executeLifecycleMethods(componentModule);
    } catch (error) {
      logger.error(
        `Error when mounting component ${component} using SystemJS`,
        error
      );
    }
  }

  private async executeLifecycleMethods(componentModule: any): Promise<void> {
    if (componentModule?.init) await componentModule.init();
    if (componentModule?.mount) await componentModule.mount();
  }
}
