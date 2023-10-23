import { IComponentRegistry } from "../ComponentRegistry";
import { ModuleLoader } from "../ModuleLoader";
import { StylingHandler } from "../StylingHandler";

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
        console.error(`Error loading ${component}`, error)
      );
    }
  }

  async load(component: string): Promise<void> {
    const urlInfo = this.getComponentURL(component);
    if (!urlInfo) return;

    const { js, css } = urlInfo;
    if (!this.isValidURL(js, css, component)) return;

    await this.loadComponent(js, css, component);
  }

  private getComponentURL(component: string) {
    const urlInfo = this.registry.getURL(component);
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
      console.error(
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
