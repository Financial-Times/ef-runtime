import { ComponentRegistry } from "./ComponentRegistry";
import { Logger } from "../Logger";
import { MockLogger } from "../Logger/__mocks__";

describe("ComponentRegistry", () => {
  let registry: ComponentRegistry;
  let logger: Logger;

  beforeEach(async () => {
    logger = new MockLogger() as unknown as Logger;

    registry = new ComponentRegistry({
      registryURL: "http://localhost:3003",
      logger: logger,
    });
  });

  it("should fetch systemCode", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            dependencies: {},
            components: {
              "ef-demo-component": { js: "js-url", css: "css-url" },
            },
          }),
      })
    );

    await registry.fetch("systemCode");
    expect(registry.getComponentInfo("ef-demo-component")).toEqual({
      js: "js-url",
      css: "css-url",
    });
    expect(logger.info).not.toHaveBeenCalled();
  });

  it("should handle fetch error with logging", async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error("Fetch error")));

    await registry.fetch("systemCode");
    expect(logger.error).toHaveBeenCalledWith(
      "Unable to fetch Component Registry",
      expect.any(Error)
    );
  });

  it("should get undefined for non-existent component", () => {
    expect(registry.getComponentInfo("non-existent")).toBeUndefined();
  });

  it("should apply overrides", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            imports: {},
          }),
      })
    );

    await registry.fetch("systemCode");
    registry.applyOverrides({
      "ef-demo-component": {
        js: "override-js-url",
        css: "override-css-url",
      },
    });
    expect(registry.getComponentInfo("ef-demo-component")).toEqual({
      js: "override-js-url",
      css: "override-css-url",
    });
  });

  it("should return component keys", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            imports: {},
          }),
      })
    );

    await registry.fetch("systemCode");
    registry.applyOverrides({
      "ef-demo-component": {
        js: "override-js-url",
        css: "override-css-url",
      },
      "another-component": {
        js: "another-js-url",
        css: "another-css-url",
      },
    });

    const keys = registry.getComponentKeys();
    expect(keys).toEqual(["ef-demo-component", "another-component"]);
  });
});
