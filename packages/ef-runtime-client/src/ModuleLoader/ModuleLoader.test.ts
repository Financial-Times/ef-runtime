import { ModuleLoader } from "../ModuleLoader";

describe("ModuleLoader", () => {
  let createElementMock: jest.Mock;
  let appendChildMock: jest.Mock;
  let moduleLoader: ModuleLoader;

  beforeEach(() => {
    createElementMock = jest.fn();
    appendChildMock = jest.fn();

    // Mock the global document object
    global.document = {
      createElement: createElementMock,
      body: {
        appendChild: appendChildMock,
      },
    } as unknown as Document;

    moduleLoader = new ModuleLoader();
  });

  it("should create a script element with proper attributes and content", () => {
    const mockURL = "https://example.com/some-module.js";
    createElementMock.mockReturnValue({});

    const scriptElement = moduleLoader.createModuleScript(mockURL);

    expect(createElementMock).toHaveBeenCalledWith("script");
    expect(scriptElement.type).toBe("module");
    expect(scriptElement.innerHTML).toContain(
      `import * as component from "${mockURL}";`
    );
    expect(scriptElement.innerHTML).toContain(
      "if (component.init) component.init();"
    );
    expect(scriptElement.innerHTML).toContain(
      "if (component.mount) component.mount();"
    );
  });
});
