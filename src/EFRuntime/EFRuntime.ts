import { IComponentRegistry } from "../ComponentRegistry";
import { ModuleLoader } from "../ModuleLoader";
import { StylingHandler } from "../StylingHandler";
import { EFComponentInfo, EFRegistryInfo } from "../types";
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
    } = {},
  ): Promise<void> {
    this.validateOptions(options);
    await this.registry.fetch(options.systemCode as string);

    const dependencies = this.registry.getRegistry().dependencies;
    if (dependencies && Object.keys(dependencies).length > 0) {
      this.addImportMap(dependencies);
      this.addLinkTags(dependencies);
    }

    if (options.overrides) {
      this.registry.applyOverrides(options.overrides);
    }

    const localOverrides = this.localStorage.getItem("ef-overrides");
    if (localOverrides) {
      this.registry.applyOverrides(JSON.parse(localOverrides));
    }

    const components: { [key: string]: EFComponentInfo } =
      this.registry.getRegistry().components;
    if (components && Object.keys(components).length > 0)
      this.loadAll(components);
  }

  addImportMap(dependencies: EFRegistryInfo["dependencies"]) {
    const pageImportMapScript = this.document.querySelector(
      "script[type='importmap']",
    );

    // Create a new JS only import map with dependencies from the registry
    const dependenciesImportMap = Object.entries(dependencies).reduce(
      (acc, [key, value]) =>
        value.type === "js" ? Object.assign(acc, { [key]: value.url }) : acc,
      {} as Record<string, string>,
    );

    if (pageImportMapScript) {
      let pageImportMap = JSON.parse(
        pageImportMapScript.innerHTML.length
          ? pageImportMapScript.innerHTML
          : "{}",
      );
      if (pageImportMap.hasOwnProperty("imports")) {
        Object.assign(pageImportMap.imports, dependenciesImportMap);
      } else {
        Object.assign(pageImportMap, { imports: dependenciesImportMap });
      }
      pageImportMapScript.innerHTML = JSON.stringify(pageImportMap);
    } else {
      let importmapScript: HTMLScriptElement =
        this.document.createElement("script");
      importmapScript.type = "importmap";
      importmapScript.innerHTML = JSON.stringify({
        imports: dependenciesImportMap,
      });
      this.document.head.appendChild(importmapScript);
    }
  }

  addLinkTags(dependencies: EFRegistryInfo["dependencies"]) {
    Object.values(dependencies).forEach(({ type, url }) => {
      const linkElement = this.document.createElement("link");
      linkElement.rel = type === "js" ? "modulepreload" : "stylesheet";
      linkElement.href = url;
      this.document.head.prepend(linkElement);
    });
  }

  async loadAll(components: { [key: string]: EFComponentInfo }): Promise<void> {
    const loadPromises = Object.entries(components).map(([component, info]) => {
      const { js, css } = info;
      if (!this.isValidURL(js, css, component)) return;

      this.loadComponent(js, css, component).catch((error) =>
        this.logger.error(`Error loading ${component}`, error),
      );
    });
    await Promise.all(loadPromises);
  }

  private isValidURL(
    js: string | null,
    css: string | null,
    component: string,
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
        `Missing ${missingParts.join(" and ")} URL for component ${component}`,
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
