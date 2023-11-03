import { EFRuntime, IRuntimeDependencies } from "./EFRuntime";
import { IComponentRegistry, IComponentInfo } from "../ComponentRegistry";
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

describe.only("EFRuntime", () => {
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

    it("fetches from the registry using the systemCode", async () => {
      await runtime.init({ systemCode: "some-system-code" });

      expect(mockRegistry.fetch).toHaveBeenCalledWith("some-system-code");
    });

    it("applies overrides if provided", async () => {
      const overrides: { [propName: string]: IComponentInfo } = {
        "some-component": { js: "js-override", css: "css-override" },
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
        "Component missing-component was not found in the Component Registry"
      );
    });

    it("adds styling and JS if the component is found in the registry", async () => {
      mockRegistry.getURL.mockReturnValue({ js: "some-js", css: "some-css" });

      await runtime.load("some-component");

      expect(mockStylingHandler.addStyling).toHaveBeenCalledWith("some-css");
      expect(mockModuleLoader.createModuleScript).toHaveBeenCalledWith(
        "some-js"
      );
    });
  });
});
