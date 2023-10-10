export class SystemJSLoader {
  static async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.addEventListener("load", () => resolve());
      script.addEventListener("error", reject);
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.14.2/system.min.js";
      document.head.append(script);
    });
  }

  static async importModule(url: string): Promise<any> {
    // @ts-ignore
    return global.System.import(url);
  }
}
