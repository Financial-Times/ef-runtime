import { logger } from "../utils/logger";
import { EFComponentInfo } from "../types";

export interface IComponentRegistry {
  fetch(systemCode: string): Promise<void>;
  getComponentInfo(component: string): EFComponentInfo | undefined;
  getComponentKeys(): string[];
  applyOverrides(overrides: { [propName: string]: EFComponentInfo }): void;
  getRegistry(): { [key: string]: EFComponentInfo };
}

export interface IComponentRegistryDependencies {
  registryURL: string;
}

export class ComponentRegistry implements IComponentRegistry {
  private registry: { [propName: string]: EFComponentInfo } = {};
  private initialised: boolean;
  private registryURL: string;

  constructor({ registryURL }: IComponentRegistryDependencies) {
    this.registryURL = registryURL;
    this.initialised = false;
  }

  async fetch(systemCode: string): Promise<void> {
    try {
      const res = await fetch(`${this.registryURL}/?app=${systemCode}`);
      const data = await res.json();
      Object.assign(this.registry, data.imports);
      this.initialised = true;
    } catch (err) {
      logger.error("Unable to fetch Component Registry", err);
    }
  }

  getComponentInfo(component: string): EFComponentInfo | undefined {
    if (!this.initialised) {
      logger.warn(
        "Unable to get component URL. Component Registry was not initialised yet"
      );
      return;
    }
    return this.registry[component];
  }

  getComponentKeys(): string[] {
    if (!this.initialised) {
      logger.warn(
        "Unable to get component keys. Component Registry was not initialised yet"
      );
      return;
    }
    return Object.keys(this.registry);
  }

  getRegistry(): { [key: string]: EFComponentInfo } {
    if (!this.initialised) {
      logger.warn(
        "Unable to get Registry. Component Registry was not initialised yet"
      );
      return {};
    }
    return { ...this.registry };
  }

  applyOverrides(overrides: { [propName: string]: EFComponentInfo }): void {
    for (const [key, { js, css }] of Object.entries(overrides)) {
      if (this.registry[key]) {
        if (js) this.registry[key].js = js;
        if (css) this.registry[key].css = css;
      } else {
        this.registry[key] = { js: js || "", css: css || "" };
      }
    }
  }
}
