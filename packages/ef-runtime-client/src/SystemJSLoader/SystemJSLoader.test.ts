import { SystemJSLoader } from "./SystemJSLoader";

describe("SystemJSLoader", () => {
  let createElementMock: jest.Mock;
  let appendMock: jest.Mock;

  beforeEach(() => {
    createElementMock = jest.fn();
    appendMock = jest.fn();

    global.document = Object.assign(global.document || {}, {
      createElement: createElementMock,
      head: { append: appendMock },
    }) as unknown as Document;
  });

  it("should initialize SystemJS", async () => {
    const script = {
      addEventListener: jest.fn((event, callback) => {
        if (event === "load") {
          callback();
        }
      }),
    };
    createElementMock.mockReturnValue(script);

    await SystemJSLoader.init();
    expect(appendMock).toHaveBeenCalledWith(script);
    expect(script.addEventListener).toHaveBeenCalledTimes(2);
  });

  it("should import module", async () => {
    // Mock the global System object
    // @ts-ignore
    global.System = { import: jest.fn().mockReturnValue(Promise.resolve({})) };

    await SystemJSLoader.importModule("url");
    // @ts-ignore
    expect(global.System.import).toHaveBeenCalledWith("url");
  });
});
