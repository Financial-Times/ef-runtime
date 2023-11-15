import { IComponentRegistry } from "../ComponentRegistry";
import { ModuleLoader, IModuleLoaderDependencies } from "./ModuleLoader";
import { Logger } from "../Logger";
import { MockLogger } from "../Logger/__mocks__";

describe("ModuleLoader", () => {
  let createElementMock: jest.Mock;
  let appendMock: jest.Mock;
  let logger: Logger;
  let moduleLoader: ModuleLoader;
  let moduleLoaderDependencies: IModuleLoaderDependencies;
  let mockRegistry: jest.Mocked<IComponentRegistry>;

  beforeEach(() => {
    createElementMock = jest.fn();
    appendMock = jest.fn();
    mockRegistry = {
      fetch: jest.fn(),
      getURL: jest.fn(),
      getComponentKeys: jest.fn(),
      applyOverrides: jest.fn(),
      getRegistry: jest.fn(),
    } as jest.Mocked<IComponentRegistry>;

    global.document = {
      createElement: createElementMock,
      head: { append: appendMock },
    } as unknown as Document;

    logger = new MockLogger() as unknown as Logger;

    moduleLoaderDependencies = {
      document: global.document,
      loaderSrc:
        "https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.14.2/system.min.js",
      registry: mockRegistry,
      logger: logger,
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
      src: "",
    };
    createElementMock.mockReturnValue(script);

    await moduleLoader.init();
    expect(appendMock).toHaveBeenCalledWith(script);
    expect(script.addEventListener).toHaveBeenCalledTimes(2);
    expect(logger.info).toHaveBeenCalledWith(
      `Script loaded: ${moduleLoaderDependencies.loaderSrc}`
    );
  });

  it("should handle script loading error", async () => {
    const errorEvent = {};
    const script = {
      addEventListener: jest.fn((event, callback) => {
        if (event === "error") {
          callback(errorEvent);
        }
      }),
      src: "",
    };
    createElementMock.mockReturnValue(script);

    await expect(moduleLoader.init()).rejects.toEqual(errorEvent);
    expect(logger.error).toHaveBeenCalledWith(
      `Failed to load script: ${moduleLoaderDependencies.loaderSrc}`,
      errorEvent
    );
  });

  it("should import module", async () => {
    // Mock the global System object
    // @ts-ignore
    global.System = { import: jest.fn().mockReturnValue(Promise.resolve({})) };

    await moduleLoader.importModule("url");
    // @ts-ignore
    expect(global.System.import).toHaveBeenCalledWith("url");
  });

  it("should log an error if module import fails", async () => {
    const error = new Error("Import error");
    // Mock the global System object
    // @ts-ignore
    global.System = { import: jest.fn().mockRejectedValue(error) };

    await expect(moduleLoader.importModule("url")).rejects.toEqual(error);
    expect(logger.error).toHaveBeenCalledWith(
      "Failed to import module: url",
      error
    );
  });
});
