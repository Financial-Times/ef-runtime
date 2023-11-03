import { ComponentRegistry, IComponentInfo } from "./index";

describe("ComponentRegistry", () => {
  let registry: ComponentRegistry;

  beforeEach(() => {
    registry = new ComponentRegistry({ registryURL: "http://localhost:3003" });
  });

  it("should fetch systemCode", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            imports: { "ef-demo-component": { js: "url-js", css: "url-css" } },
          }),
      })
    );

    await registry.fetch("systemCode");
    expect(registry.getURL("ef-demo-component")).toEqual({
      js: "url-js",
      css: "url-css",
    });
  });

  it("should get undefined for non-existent component", () => {
    expect(registry.getURL("non-existent")).toBeUndefined();
  });

  it("should apply overrides", () => {
    const override: IComponentInfo = { js: "override-js", css: "override-css" };
    registry.applyOverrides({ "ef-demo-component": override });
    expect(registry.getURL("ef-demo-component")).toEqual(override);
  });

  it("should return component keys", () => {
    const overrides: { [key: string]: IComponentInfo } = {
      "ef-demo-component": { js: "override-js", css: "override-css" },
      "another-component": { js: "another-js", css: "another-css" },
    };
    registry.applyOverrides(overrides);

    const keys = registry.getComponentKeys();
    expect(keys).toEqual(["ef-demo-component", "another-component"]);
  });
});
