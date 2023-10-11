import { IComponentRegistry } from "../ComponentRegistry";
import { ModuleLoader } from "../ModuleLoader";

export interface IRuntimeDependencies {
  componentRegistry: IComponentRegistry;
  moduleLoader: ModuleLoader;
  document: Document;
}

export class EFRuntime {
  private registry: IComponentRegistry;
  private moduleLoader: ModuleLoader;
  private document: Document;

  constructor({
    componentRegistry,
    moduleLoader,
    document,
  }: IRuntimeDependencies) {
    this.registry = componentRegistry;
    this.moduleLoader = moduleLoader;
    this.document = document;
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
    for (const component of this.registry.getComponentKeys()) {
      this.load(component).catch((error) =>
        console.error(`Error loading ${component}`, error)
      );
    }
  }

  async load(component: string): Promise<void> {
    const url = this.registry.getURL(component);
    if (!url) {
      console.error(
        `Component ${component} was not found in the Component Registry`
      );
      return;
    }
    this.appendCSS(url);
    try {
      const componentModule = await this.moduleLoader.importModule(`${url}/js`);
      this.executeLifecycleMethods(componentModule);
    } catch (error) {
      console.error(
        `Failed to load component ${component} using SystemJS`,
        error
      );
    }
  }

  private appendCSS(url: string): void {
    const componentCSS = this.document.createElement("link");
    componentCSS.rel = "stylesheet";
    componentCSS.href = `${url}/css`;
    this.document.head.append(componentCSS);
  }

  private async executeLifecycleMethods(componentModule: any): Promise<void> {
    if (componentModule?.init) await componentModule.init();
    if (componentModule?.mount) componentModule.mount();
  }
}
