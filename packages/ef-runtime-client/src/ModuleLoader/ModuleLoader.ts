import { IComponentRegistry } from "../ComponentRegistry";

export class ModuleLoader {
  private componentRegistry;

  constructor(componentRegistry: IComponentRegistry) {
    this.componentRegistry = componentRegistry;
  }

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  async importModule(url: string): Promise<any> {
    return System.import(url);
  }
}
