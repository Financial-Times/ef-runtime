import { EFComponentInfo } from "../types";

export interface IComponentRegistry {
  fetch(systemCode: string): Promise<void>;
  getURL(component: string): EFComponentInfo | undefined;
  getComponentKeys(): string[];
  applyOverrides(overrides: {
    [propName: string]: EFComponentInfo;
  }): void;
  getRegistry(): { [key: string]: EFComponentInfo };
}

export interface IComponentRegistryDependencies {
  registryURL: string;
}

export class ComponentRegistry implements IComponentRegistry {
  private registry: { [propName: string]: EFComponentInfo } = {};
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

  getURL(component: string): EFComponentInfo | undefined {
    return this.registry[component];
  }

  getComponentKeys(): string[] {
    return Object.keys(this.registry);
  }

  getRegistry(): { [key: string]: EFComponentInfo } {
    return { ...this.registry };
  }

  applyOverrides(overrides: {
    [propName: string]: EFComponentInfo;
  }): void {
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
