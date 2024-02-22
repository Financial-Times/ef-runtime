import { EFRuntime, IRuntimeDependencies } from "./EFRuntime";
import { IComponentRegistry } from "../ComponentRegistry";
import { ModuleLoader } from "../ModuleLoader";
import { StylingHandler } from "../StylingHandler";
import { Logger } from "../Logger";
import { MockLogger } from "../Logger/__mocks__";

const globalAny: any = global;
globalAny.document = {
  body: {
    appendChild: jest.fn(),
  },
};

class MockStylingHandler extends StylingHandler {
  constructor(document: Document, logger: Logger) {
    super(document, logger);
  }
  addStyling = jest.fn();
}

class MockModuleLoader extends ModuleLoader {
  createModuleScript = jest.fn();
}

describe("EFRuntime", () => {
  let mockRegistry: jest.Mocked<IComponentRegistry>;
  let mockModuleLoader: MockModuleLoader;
  let mockStylingHandler: MockStylingHandler;
  let logger: Logger;
  let dependencies: IRuntimeDependencies;
  let runtime: EFRuntime;
  let mockLocalStorage: Storage;
  let mockLocalStorageMock: Record<string, string>;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRegistry = {
      fetch: jest.fn(),
      getComponentInfo: jest.fn(),
      getComponentKeys: jest.fn().mockReturnValue([]),
      applyOverrides: jest.fn(),
      getRegistry: jest.fn().mockReturnValue({}),
    } as jest.Mocked<IComponentRegistry>;

    const mockDocument = {
      createElement: jest.fn().mockReturnValue({ type: "", innerHTML: "" }),
      head: {
        appendChild: jest.fn(),
      },
      body: {
        appendChild: jest.fn(),
      },
      querySelector: jest.fn()
    } as unknown as Document;

    logger = new MockLogger() as unknown as Logger;

    mockModuleLoader = new MockModuleLoader();
    mockStylingHandler = new MockStylingHandler(mockDocument, logger);

    logger = new MockLogger() as unknown as Logger;

    mockLocalStorageMock = {};

    mockLocalStorage = {
      getItem: jest.fn().mockImplementation((key) => mockLocalStorageMock[key]),
      setItem: jest.fn().mockImplementation((key, value) => {
        mockLocalStorageMock[key] = value;
      }),
      clear: jest.fn().mockImplementation(() => {
        mockLocalStorageMock = {};
      }),
      removeItem: jest.fn().mockImplementation((key) => {
        delete mockLocalStorageMock[key];
      }),
      length: 0,
      key: jest.fn(),
    } as unknown as Storage;

    dependencies = {
      componentRegistry: mockRegistry,
      moduleLoader: mockModuleLoader,
      stylingHandler: mockStylingHandler,
      document: mockDocument,
      logger: logger,
      localStorage: mockLocalStorage,
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

    it("initialises the module loader and fetches registry", async () => {
      await runtime.init({ systemCode: "some-system-code" });

      expect(mockRegistry.fetch).toHaveBeenCalledWith("some-system-code");
    });

    it("applies overrides if provided", async () => {
      const overrides = {
        "some-component": {
          js: "some-js-url",
          css: "some-css-url",
        },
      };
      await runtime.init({ systemCode: "some-system-code", overrides });

      expect(mockRegistry.applyOverrides).toHaveBeenCalledWith(overrides);
    });
  });

  describe("load", () => {
    it("logs an error if component is not found in registry", async () => {
      mockRegistry.getComponentInfo.mockReturnValue(undefined);
      const spyLogger = jest.spyOn(logger, "error");

      await runtime.load("missing-component");

      expect(spyLogger).toHaveBeenCalledWith(
        "Failed to retrieve Info for component missing-component"
      );
    });

    it("logs an error if js is missing from registry", async () => {
      mockRegistry.getComponentInfo.mockReturnValue({
        js: null,
        css: "some-css-url",
      });
      console.error = jest.fn();

      await runtime.load("some-component");

      expect(logger.error).toHaveBeenCalledWith(
        "Missing JS URL for component some-component"
      );
    });

    it("logs an error if css is missing from registry", async () => {
      mockRegistry.getComponentInfo.mockReturnValue({
        js: "some-js-url",
        css: null,
      });
      console.error = jest.fn();

      await runtime.load("some-component");

      expect(logger.error).toHaveBeenCalledWith(
        "Missing CSS URL for component some-component"
      );
    });

    it("logs an error if both js and css are missing from registry", async () => {
      mockRegistry.getComponentInfo.mockReturnValue({ js: null, css: null });
      console.error = jest.fn();

      await runtime.load("some-component");

      expect(logger.error).toHaveBeenCalledWith(
        "Missing JS and CSS URL for component some-component"
      );
    });

    it("adds styling and imports module if component is found in registry", async () => {
      mockRegistry.getComponentInfo.mockReturnValue({
        js: "some-js-url",
        css: "some-css-url",
      });
      mockModuleLoader.createModuleScript.mockResolvedValue({});

      await runtime.load("some-component");

      expect(mockStylingHandler.addStyling).toHaveBeenCalledWith(
        "some-css-url"
      );
      expect(mockModuleLoader.createModuleScript).toHaveBeenCalledWith(
        "some-js-url"
      );
    });
  });
});
