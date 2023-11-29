import { ComponentRegistry } from "./index";

describe("ComponentRegistry", () => {
  let registry: ComponentRegistry;

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          imports: {
            "ef-demo-component": { js: "js-url", css: "css-url" },
          },
        }),
    })
  );

  beforeEach(async () => {
    registry = new ComponentRegistry({ registryURL: "http://localhost:3003" });
    await registry.fetch("systemCode");
  });

  it("should fetch systemCode", async () => {
    expect(registry.getComponentInfo("ef-demo-component")).toEqual({
      js: "js-url",
      css: "css-url",
    });
  });

  it("should get undefined for non-existent component", () => {
    expect(registry.getComponentInfo("non-existent")).toBeUndefined();
  });

  it("should apply overrides", () => {
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

  it("should return component keys", () => {
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
