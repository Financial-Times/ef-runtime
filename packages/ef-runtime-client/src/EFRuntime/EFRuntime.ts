import { IComponentRegistry } from "../ComponentRegistry";
import { ModuleLoader } from "../ModuleLoader";
import { StylingHandler } from "../StylingHandler";
import { EFComponentInfo } from "../types";
import { Logger } from "../Logger";

export interface IRuntimeDependencies {
  componentRegistry: IComponentRegistry;
  moduleLoader: ModuleLoader;
  stylingHandler: StylingHandler;
  document: Document;
  logger: Logger;
  localStorage: Storage;
}

export class EFRuntime {
  private registry: IComponentRegistry;
  private moduleLoader: ModuleLoader;
  private stylingHandler: StylingHandler;
  private document: Document;
  private logger: Logger;
  private localStorage: Storage;

  constructor({
    componentRegistry,
    moduleLoader,
    stylingHandler,
    document,
    logger,
    localStorage,
  }: IRuntimeDependencies) {
    this.registry = componentRegistry;
    this.moduleLoader = moduleLoader;
    this.stylingHandler = stylingHandler;
    this.document = document;
    this.logger = logger;
    this.localStorage = localStorage;
  }

  private validateOptions(options: {
    systemCode?: string;
    overrides?: { [propName: string]: EFComponentInfo };
  }): void {
    if (!options.systemCode) {
      this.logger.error("Must provide a systemCode option");
      throw new Error("Must provide a systemCode option");
    }
  }

  async init(
    options: {
      systemCode?: string;
      overrides?: { [propName: string]: EFComponentInfo };
    } = {}
  ): Promise<void> {
    this.validateOptions(options);
    await this.registry.fetch(options.systemCode as string);

    this.addImportMap();

    if (options.overrides) {
      this.registry.applyOverrides(options.overrides);
    }

    const localOverrides = this.localStorage.getItem("ef-overrides");
    if (localOverrides) {
      this.registry.applyOverrides(JSON.parse(localOverrides));
    }

    this.loadAll();
  }

  addImportMap() {
    const imports = {
      "ef-react": "https://esm.sh/react@18.2.0",
      "ef-react-dom/client": "https://esm.sh/react-dom@18.2.0/client"
    };

    const pageImportMapScript = document.querySelector("script[type='importmap']");

    if (pageImportMapScript) {
      let pageImportMap = JSON.parse(pageImportMapScript.innerHTML);
      if (pageImportMap.hasOwnProperty("imports")) {
        Object.assign(pageImportMap.imports, imports);
      } else {
        Object.assign(pageImportMap, { imports });
      }
      pageImportMapScript.innerHTML = JSON.stringify(pageImportMap);
    } else {
      let importmapScript = document.createElement('script');
      importmapScript.type = "importmap";
      importmapScript.innerHTML = JSON.stringify({ imports });
      document.head.appendChild(importmapScript);
    }
  }

  async loadAll(): Promise<void> {
    const components = Object.keys(this.registry.getRegistry());
    const loadPromises = components.map((component) =>
      this.load(component).catch((error) =>
        this.logger.error(`Error loading ${component}`, error)
      )
    );
    await Promise.all(loadPromises);
  }

  async load(component: string): Promise<void> {
    const urlInfo = this.registry.getComponentInfo(component);
    if (!urlInfo) {
      this.logger.error(`Failed to retrieve Info for component ${component}`);
      return;
    }

    const { js, css } = urlInfo;
    if (!this.isValidURL(js, css, component)) return;

    await this.loadComponent(js, css, component);
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
      this.logger.error(
        `Missing ${missingParts.join(" and ")} URL for component ${component}`
      );
    }

    return isValid;
  }

  private async loadComponent(js: string, css: string, component: string) {
    this.stylingHandler.addStyling(css);
    try {
      const componentScript = this.moduleLoader.createModuleScript(js);
      document.body.append(componentScript);
      this.logger.info(`${component} js module was loaded successfully`);
    } catch (error) {
      this.logger.error(`Failed to load component ${component} `, error);
    }
  }
}
