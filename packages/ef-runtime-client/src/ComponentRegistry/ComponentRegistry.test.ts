import { ComponentRegistry } from "./index";

describe("ComponentRegistry", () => {
  let registry: ComponentRegistry;

  beforeEach(() => {
    registry = new ComponentRegistry();
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
});
