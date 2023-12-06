import { EFRuntime, IRuntimeDependencies } from "./EFRuntime";
import { IComponentRegistry } from "../ComponentRegistry";
import { ModuleLoader } from "../ModuleLoader";
import { StylingHandler } from "../StylingHandler";

const globalAny: any = global;
globalAny.document = {
  body: {
    appendChild: jest.fn(),
  },
};

class MockStylingHandler extends StylingHandler {
  constructor(document: Document) {
    super(document);
  }
  addStyling = jest.fn();
}

class MockModuleLoader extends ModuleLoader {
  createModuleScript = jest.fn();
}

class MockLocalStorage {
  private store: { [key: string]: string };
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

describe("EFRuntime", () => {
  let mockRegistry: jest.Mocked<IComponentRegistry>;
  let mockModuleLoader: MockModuleLoader;
  let mockStylingHandler: MockStylingHandler;
  let dependencies: IRuntimeDependencies;
  let runtime: EFRuntime;

  beforeEach(() => {
    jest.clearAllMocks();

    mockRegistry = {
      fetch: jest.fn(),
      getURL: jest.fn().mockImplementation((componentName) => {
        if (componentName === "some-component") {
          return { js: "some-js", css: "some-css" };
        } else if (componentName === "another-component") {
          return { js: "another-js", css: "another-css" };
        }
      }),
      getComponentKeys: jest.fn().mockReturnValue([]),
      applyOverrides: jest.fn(),
      getRegistry: jest.fn().mockReturnValue({}),
    } as jest.Mocked<IComponentRegistry>;

    const mockDocument = {
      createElement: jest.fn(),
      body: {
        appendChild: jest.fn(),
      },
    } as unknown as Document;

    const mockLocalStorage = new MockLocalStorage() as unknown as Storage;
    mockLocalStorage.setItem(
      "ef-overrides",
      JSON.stringify({ "some-component": "some-url" })
    );
    global.localStorage = mockLocalStorage;

    mockModuleLoader = new MockModuleLoader();
    mockStylingHandler = new MockStylingHandler(mockDocument);

    dependencies = {
      componentRegistry: mockRegistry,
      moduleLoader: mockModuleLoader,
      stylingHandler: mockStylingHandler,
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

  describe("loadAll", () => {
    describe("loadAll", () => {
      it("loads all available components from the registry", async () => {
        mockRegistry.getRegistry.mockReturnValue({
          "some-component": { js: "some-js", css: "some-css" },
          "another-component": { js: "another-js", css: "another-css" },
        });

        await runtime.init({ systemCode: "some-system-code" }); // Make sure init is called
        await runtime.loadAll(); // This line may not be necessary now that init calls loadAll

        expect(mockStylingHandler.addStyling).toHaveBeenCalledWith("some-css");
        expect(mockStylingHandler.addStyling).toHaveBeenCalledWith(
          "another-css"
        );
        expect(mockModuleLoader.createModuleScript).toHaveBeenCalledWith(
          "some-js"
        );
        expect(mockModuleLoader.createModuleScript).toHaveBeenCalledWith(
          "another-js"
        );
      });
    });
  });

  describe("load", () => {
    it("logs an error if the component is not found in the registry", async () => {
      mockRegistry.getURL.mockReturnValue(undefined);
      console.error = jest.fn();

      await runtime.load("missing-component");

      expect(console.error).toHaveBeenCalledWith(
        "Failed to retrieve URL for component missing-component"
      );
    });

    it("logs an error if js is missing from registry", async () => {
      mockRegistry.getURL.mockReturnValue({ js: null, css: "some-css-url" });
      console.error = jest.fn();

      await runtime.load("some-component");

      expect(console.error).toHaveBeenCalledWith(
        "Missing JS URL for component some-component"
      );
    });

    it("logs an error if css is missing from registry", async () => {
      mockRegistry.getURL.mockReturnValue({ js: "some-js-url", css: null });
      console.error = jest.fn();

      await runtime.load("some-component");

      expect(console.error).toHaveBeenCalledWith(
        "Missing CSS URL for component some-component"
      );
    });

    it("logs an error if both js and css are missing from registry", async () => {
      mockRegistry.getURL.mockReturnValue({ js: null, css: null });
      console.error = jest.fn();

      await runtime.load("some-component");

      expect(console.error).toHaveBeenCalledWith(
        "Missing JS and CSS URL for component some-component"
      );
    });

    it("adds styling and imports module if component is found in registry", async () => {
      mockRegistry.getURL.mockReturnValue({
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
