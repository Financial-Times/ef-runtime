import { logger } from "../utils/logger";

export interface IComponentRegistry {
  fetch(systemCode: string): Promise<void>;
  getURL(component: string): string | undefined;
  getComponentKeys(): string[];
  applyOverrides(overrides: { [propName: string]: string }): void;
  getRegistry(): { [key: string]: string };
}

export interface IComponentRegistryDependencies {
  registryURL: string;
}

export class ComponentRegistry implements IComponentRegistry {
  private registry: { [propName: string]: string } = {};
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

  getURL(component: string): string | undefined {
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

  getRegistry(): { [key: string]: string } {
    if (!this.initialised) {
      logger.warn(
        "Unable to get Registry. Component Registry was not initialised yet"
      );
      return {};
    }
    return { ...this.registry };
  }

  applyOverrides(overrides: { [propName: string]: string }): void {
    try {
      Object.assign(this.registry, overrides);
      if (Object.keys(overrides).length > 0) {
        // if override includes at least one entry
        // considers the components initialised even
        // if fetch was not called
        this.initialised = true;
      }
    } catch (err) {
      logger.error("Failed to apply overrides", err);
    }
  }
}
