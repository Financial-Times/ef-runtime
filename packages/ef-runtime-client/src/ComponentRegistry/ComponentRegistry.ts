export interface IComponentRegistry {
  fetch(systemCode: string): Promise<void>;
  getURL(component: string): { js: string; css: string } | undefined;
  getComponentKeys(): string[];
  applyOverrides(overrides: {
    [propName: string]: { js: string; css: string };
  }): void;
  getRegistry(): { [key: string]: { js: string; css: string } };
}

export interface IComponentRegistryDependencies {
  registryURL: string;
}

export class ComponentRegistry implements IComponentRegistry {
  private registry: { [propName: string]: { js: string; css: string } } = {};
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

  getURL(component: string): { js: string; css: string } | undefined {
    return this.registry[component];
  }

  getComponentKeys(): string[] {
    return Object.keys(this.registry);
  }

  getRegistry(): { [key: string]: { js: string; css: string } } {
    return { ...this.registry };
  }

  applyOverrides(overrides: {
    [propName: string]: { js: string; css: string };
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
