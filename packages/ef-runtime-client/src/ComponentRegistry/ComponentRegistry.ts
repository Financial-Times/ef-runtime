export interface IComponentRegistry {
  fetch(systemCode: string): Promise<void>;
  getURL(component: string): string | undefined;
  getComponentKeys(): string[];
  applyOverrides(overrides: { [propName: string]: string }): void;
}

export class ComponentRegistry implements IComponentRegistry {
  private registry: { [propName: string]: string } = {};

  async fetch(systemCode: string): Promise<void> {
    try {
      const res = await fetch(`http://localhost:3003/?app=${systemCode}`);
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

  applyOverrides(overrides: { [propName: string]: string }): void {
    Object.assign(this.registry, overrides);
  }
}
