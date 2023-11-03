import { ComponentRegistry } from "../ComponentRegistry";
import { ModuleLoader, IModuleLoaderDependencies } from "./ModuleLoader";

describe("ModuleLoader", () => {
  let createElementMock: jest.Mock;
  let appendMock: jest.Mock;
  let moduleLoader: ModuleLoader;
  let moduleLoaderDependencies: IModuleLoaderDependencies;

  beforeEach(() => {
    createElementMock = jest.fn();
    appendMock = jest.fn();

    global.document = Object.assign(global.document || {}, {
      createElement: createElementMock,
      head: { append: appendMock },
    }) as unknown as Document;

    const registryDependencies = {
    registryURL: "https://ef-component-registry-51742754f2eb.herokuapp.com",
    };
    const registry = new ComponentRegistry(registryDependencies);

    moduleLoaderDependencies = {
      document: global.document,
      loaderSrc:
        "https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.14.2/system.min.js",
      registry
    };

    moduleLoader = new ModuleLoader(moduleLoaderDependencies);
  });

  it("should initialize the module loader", async () => {
    const script = {
      addEventListener: jest.fn((event, callback) => {
        if (event === "load") {
          callback();
        }
      }),
    };
    createElementMock.mockReturnValue(script);

    await moduleLoader.init();
    expect(appendMock).toHaveBeenCalledWith(script);
    expect(script.addEventListener).toHaveBeenCalledTimes(2);
  });

  it("should import module", async () => {
    // Mock the global System object
    // @ts-ignore
    global.System = { import: jest.fn().mockReturnValue(Promise.resolve({})) };

    await moduleLoader.importModule("url");
    // @ts-ignore
    expect(global.System.import).toHaveBeenCalledWith("url");
  });
});
