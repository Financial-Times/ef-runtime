import { StylingHandler } from "./StylingHandler";
import { Logger } from "../Logger";
import { MockLogger } from "../Logger/__mocks__";

describe("StylingHandler", () => {
  let stylingHandler: StylingHandler;
  let mockDocument: Document;
  let createElementMock: jest.Mock;
  let appendMock: jest.Mock;
  let logger: Logger;

  beforeEach(() => {
    createElementMock = jest.fn();
    appendMock = jest.fn();

    logger = new MockLogger() as unknown as Logger;

    mockDocument = {
      createElement: createElementMock,
      head: {
        append: appendMock,
      },
    } as unknown as Document;

    stylingHandler = new StylingHandler(mockDocument, logger);
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
    expect(logger.info).toHaveBeenCalledWith(`Styling added: ${testUrl}`);
  });

  it("should log an error if styling cannot be added", () => {
    createElementMock.mockImplementation(() => {
      throw new Error("Failed to create element");
    });

    const testUrl = "http://example.com";

    stylingHandler.addStyling(testUrl);

    expect(logger.error).toHaveBeenCalledWith(
      `Failed to add styling: ${testUrl}`,
      expect.any(Error)
    );
  });
});
