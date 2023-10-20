import { EFRuntime, IRuntimeDependencies } from "./EFRuntime";
import { IComponentRegistry } from "../ComponentRegistry";
import { ModuleLoader, IModuleLoaderDependencies } from "../ModuleLoader";
import { StylingHandler } from "../StylingHandler";
import { logger } from "../utils/logger";

class MockStylingHandler extends StylingHandler {
  constructor(document: Document) {
    super(document);
  }
  addStyling = jest.fn();
}

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
  let mockStylingHandler: MockStylingHandler;
  let dependencies: IRuntimeDependencies;
  let runtime: EFRuntime;

  beforeEach(() => {
    mockRegistry = {
      fetch: jest.fn(),
      getURL: jest.fn(),
      getComponentKeys: jest.fn().mockReturnValue([]),
      applyOverrides: jest.fn(),
      getRegistry: jest.fn().mockReturnValue({}),
    } as jest.Mocked<IComponentRegistry>;

    const mockDocument = {
      createElement: jest.fn(),
      head: {
        append: jest.fn(),
      },
    } as unknown as Document;

    const moduleLoaderDependencies: IModuleLoaderDependencies = {
      document: mockDocument,
      loaderSrc: "someSrc",
    };

    mockModuleLoader = new MockModuleLoader(moduleLoaderDependencies);
    mockStylingHandler = new MockStylingHandler(mockDocument);

    dependencies = {
      componentRegistry: mockRegistry,
      moduleLoader: mockModuleLoader,
      stylingHandler: mockStylingHandler,
    };

    runtime = new EFRuntime(dependencies);
  });

  describe("init", () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });

    it("throws an error if systemCode is not provided", async () => {
      await expect(runtime.init({})).rejects.toThrow(
        "Must provide a systemCode option"
      );
    });

    it("initializes the module loader and fetches registry", async () => {
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
      const spyLogger = jest.spyOn(logger, "error");

      await runtime.load("some-component");

      expect(spyLogger).toHaveBeenCalledWith(
        "Component some-component was not found in the Component Registry"
      );
    });

    it("adds styling if component is found in registry", async () => {
      mockRegistry.getURL.mockReturnValue("some-url");

      await runtime.load("some-component");

      expect(mockStylingHandler.addStyling).toHaveBeenCalledWith("some-url");
    });
  });
});
