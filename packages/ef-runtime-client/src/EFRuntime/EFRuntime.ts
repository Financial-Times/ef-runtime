import { IComponentRegistry, IComponentInfo } from "../ComponentRegistry";
import { ModuleLoader } from "../ModuleLoader";
import { StylingHandler } from "../StylingHandler";

export interface IRuntimeDependencies {
  componentRegistry: IComponentRegistry;
  moduleLoader: ModuleLoader;
  stylingHandler: StylingHandler;
  document: Document;
}

export class EFRuntime {
  private registry: IComponentRegistry;
  private moduleLoader: ModuleLoader;
  private stylingHandler: StylingHandler;
  private document: Document;

  constructor({
    componentRegistry,
    moduleLoader,
    stylingHandler,
    document,
  }: IRuntimeDependencies) {
    this.registry = componentRegistry;
    this.moduleLoader = moduleLoader;
    this.stylingHandler = stylingHandler;
    this.document = document;
  }

  private validateOptions(options: {
    systemCode?: string;
    overrides?: { [propName: string]: IComponentInfo };
  }): void {
    if (!options.systemCode) {
      throw new Error("Must provide a systemCode option");
    }
  }

  async init(
    options: {
      systemCode?: string;
      overrides?: { [propName: string]: IComponentInfo };
    } = {}
  ): Promise<void> {
    this.validateOptions(options);
    await this.registry.fetch(options.systemCode as string);
    if (options.overrides) {
      this.registry.applyOverrides(options.overrides);
    }
    await this.loadAll();
  }

  async loadAll(): Promise<void> {
    const components = Object.keys(this.registry.getRegistry());
    const loadPromises = components.map((component) =>
      this.load(component).catch((error) =>
        console.error(`Error loading ${component}`, error)
      )
    );
    await Promise.all(loadPromises);
  }

  async load(component: string): Promise<void> {
    const urlInfo = this.registry.getURL(component);
    if (!urlInfo) {
      console.error(
        `Component ${component} was not found in the Component Registry`
      );
      return;
    }
    const { js, css } = urlInfo;
    this.stylingHandler.addStyling(css);
    const script = this.moduleLoader.createModuleScript(js);
    document.body.appendChild(script);
  }
}
