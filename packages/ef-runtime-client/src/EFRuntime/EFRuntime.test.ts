import { EFRuntime, IRuntimeDependencies } from "./EFRuntime";
import { IComponentRegistry } from "../ComponentRegistry";
import { ModuleLoader, IModuleLoaderDependencies } from "../ModuleLoader";

class MockModuleLoader extends ModuleLoader {
  constructor(dependencies: IModuleLoaderDependencies) {
    super(dependencies);
  }

  init = jest.fn();
  importModule = jest.fn();
}

describe("EFRuntime", () => {
  let mockRegistry: jest.Mocked<IComponentRegistry>;
  let mockModuleLoader: MockModuleLoader;
  let mockDocument: Document;
  let dependencies: IRuntimeDependencies;
  let runtime: EFRuntime;

  beforeEach(() => {
    mockRegistry = {
      fetch: jest.fn(),
      getURL: jest.fn(),
      getComponentKeys: jest.fn().mockReturnValue([]),
      applyOverrides: jest.fn(),
    };

    mockDocument = {
      createElement: jest.fn(),
      head: {
        append: jest.fn(),
      },
    } as any;

    const moduleLoaderDependencies: IModuleLoaderDependencies = {
      document: mockDocument,
      loaderSrc: "someSrc",
    };

    mockModuleLoader = new MockModuleLoader(moduleLoaderDependencies);

    dependencies = {
      componentRegistry: mockRegistry,
      moduleLoader: mockModuleLoader,
      document: mockDocument,
    };

    runtime = new EFRuntime(dependencies);
  });

  describe("init", () => {
    it("throws an error if systemCode is not provided", async () => {
      await expect(runtime.init({})).rejects.toThrow(
        "Must provide a systemCode option"
      );
    });

    it("initialises the module loader and fetches registry", async () => {
      await runtime.init({ systemCode: "some-system-code" });

      expect(mockModuleLoader.init).toHaveBeenCalled();
      expect(mockRegistry.fetch).toHaveBeenCalledWith("some-system-code");
    });

    it("applies overrides if provided", async () => {
      const overrides = { "some-component": "some-url" };
      await runtime.init({ systemCode: "some-system-code", overrides });

      expect(mockRegistry.applyOverrides).toHaveBeenCalledWith(overrides);
    });
  });

  describe("load", () => {
    it("logs an error if component is not found in registry", async () => {
      mockRegistry.getURL.mockReturnValue(undefined);
      console.error = jest.fn();

      await runtime.load("some-component");

      expect(console.error).toHaveBeenCalledWith(
        "Component some-component was not found in the Component Registry"
      );
    });
  });
});
