export interface IModuleLoaderDependencies {
  document: Document;
  loaderSrc: string;
}

export class ModuleLoader {
  private document: Document;
  private loaderSrc: string;

  constructor({ document, loaderSrc }: IModuleLoaderDependencies) {
    this.document = document;
    this.loaderSrc = loaderSrc;
  }

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = this.document.createElement("script");
      script.addEventListener("load", () => resolve());
      script.addEventListener("error", reject);
      script.src = this.loaderSrc;
      this.document.head.append(script);
    });
  }

  async importModule(url: string): Promise<any> {
    // @ts-ignore
    return global.System.import(url);
  }
}
