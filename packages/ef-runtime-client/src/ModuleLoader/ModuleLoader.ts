import { IComponentRegistry } from "../ComponentRegistry";
import { Logger } from "../Logger";

export interface IModuleLoaderDependencies {
  document: Document;
  loaderSrc: string;
  registry: IComponentRegistry;
  logger: Logger;
}

export class ModuleLoader {
  private document: Document;
  private loaderSrc: string;
  private registry: IComponentRegistry;
  private logger: Logger;

  constructor({
    document,
    loaderSrc,
    registry,
    logger,
  }: IModuleLoaderDependencies) {
    this.document = document;
    this.loaderSrc = loaderSrc;
    this.registry = registry;
    this.logger = logger;
  }

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = this.document.createElement("script");
      script.addEventListener("load", () => {
        this.logger.info(`Script loaded: ${this.loaderSrc}`);
        resolve();
      });
      script.addEventListener("error", (event) => {
        this.logger.error(`Failed to load script: ${this.loaderSrc}`, event);
        reject(event);
      });
      script.src = this.loaderSrc;
      this.document.head.append(script);
    });
  }

  async importModule(url: string): Promise<any> {
    try {
      // @ts-ignore
      return await global.System.import(url);
    } catch (error) {
      this.logger.error(`Failed to import module: ${url}`, error);
      throw error;
    }
  }
}
