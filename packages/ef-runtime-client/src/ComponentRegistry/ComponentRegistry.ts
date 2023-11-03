export interface IComponentInfo {
  js: string;
  css: string;
}

export interface IComponentRegistry {
  fetch(systemCode: string): Promise<void>;
  getURL(component: string): IComponentInfo | undefined;
  getComponentKeys(): string[];
  applyOverrides(overrides: { [propName: string]: IComponentInfo }): void;
  getRegistry(): { [key: string]: IComponentInfo };
}

export interface IComponentRegistryDependencies {
  registryURL: string;
}

export class ComponentRegistry implements IComponentRegistry {
  private registry: { [propName: string]: IComponentInfo } = {};
  private registryURL: string;

  constructor({ registryURL }: IComponentRegistryDependencies) {
    this.registryURL = registryURL;
  }

  async fetch(systemCode: string): Promise<void> {
    try {
      const res = await fetch(`${this.registryURL}/?app=${systemCode}`);
      const data = await res.json();
      Object.assign(this.registry, data.imports);
    } catch (err) {
      console.error("Unable to fetch Component Registry", err);
    }
  }

  getURL(component: string): IComponentInfo | undefined {
    return this.registry[component];
  }

  getComponentKeys(): string[] {
    return Object.keys(this.registry);
  }

  getRegistry(): { [key: string]: IComponentInfo } {
    return { ...this.registry };
  }

  applyOverrides(overrides: { [propName: string]: IComponentInfo }): void {
    for (const key in overrides) {
      if (Object.prototype.hasOwnProperty.call(overrides, key)) {
        const existing = this.registry[key];
        const override = overrides[key];

        if (existing) {
          this.registry[key] = {
            js: override.js || existing.js,
            css: override.css || existing.css,
          };
        } else {
          this.registry[key] = override;
        }
      }
    }
  }
}
