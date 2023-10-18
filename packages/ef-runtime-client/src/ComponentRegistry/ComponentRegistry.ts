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

  getURL(component: string): string | undefined {
    return this.registry[component];
  }

  getComponentKeys(): string[] {
    return Object.keys(this.registry);
  }

  getRegistry(): { [key: string]: string } {
    return { ...this.registry };
  }

  applyOverrides(overrides: { [propName: string]: string }): void {
    Object.assign(this.registry, overrides);
  }
}
