export class ModuleLoader {
  createModuleScript(url: string): HTMLScriptElement {
    const script = document.createElement("script");
    script.type = "module";
    script.innerHTML = `
      import * as component from "${url}";
      if (component.init) component.init();
      if (component.mount) component.mount();
    `;
    return script;
  }
}
