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
});
