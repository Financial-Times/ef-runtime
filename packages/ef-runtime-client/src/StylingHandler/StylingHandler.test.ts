import { StylingHandler, IStylingHandler } from "./StylingHandler";

describe("StylingHandler", () => {
  let stylingHandler: IStylingHandler;
  let mockDocument: Document;
  let createElementMock: jest.Mock;
  let appendMock: jest.Mock;

  beforeEach(() => {
    createElementMock = jest.fn();
    appendMock = jest.fn();

    mockDocument = {
      createElement: createElementMock,
      head: {
        append: appendMock,
      },
    } as unknown as Document;

    stylingHandler = new StylingHandler(mockDocument);
  });

  it("should add styling", () => {
    const linkElement: { rel?: string; href?: string } = {};
    createElementMock.mockReturnValue(linkElement);

    const testUrl = "http://example.com";
    stylingHandler.addStyling(testUrl);

    expect(createElementMock).toHaveBeenCalledWith("link");
    expect(linkElement).toEqual({
      rel: "stylesheet",
      href: testUrl,
    });
    expect(appendMock).toHaveBeenCalledWith(linkElement);
  });
});
