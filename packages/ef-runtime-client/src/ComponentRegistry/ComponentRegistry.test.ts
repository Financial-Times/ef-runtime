import { ComponentRegistry } from "./index";

describe("ComponentRegistry", () => {
  let registry: ComponentRegistry;

  beforeEach(() => {
    registry = new ComponentRegistry({ registryURL: "http://localhost:3003" });
  });

  it("should fetch systemCode", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ imports: { "ef-demo-component": "url" } }),
      })
    );

    await registry.fetch("systemCode");
    expect(registry.getURL("ef-demo-component")).toBe("url");
  });

  it("should get undefined for non-existent component", () => {
    expect(registry.getURL("non-existent")).toBeUndefined();
  });

  it("should apply overrides", () => {
    registry.applyOverrides({ "ef-demo-component": "override-url" });
    expect(registry.getURL("ef-demo-component")).toBe("override-url");
  });

  // New test case for getComponentKeys
  it("should return component keys", () => {
    registry.applyOverrides({
      "ef-demo-component": "override-url",
      "another-component": "another-url",
    });

    const keys = registry.getComponentKeys();
    expect(keys).toEqual(["ef-demo-component", "another-component"]);
  });
});
