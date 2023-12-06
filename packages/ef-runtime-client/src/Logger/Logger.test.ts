import { Logger, ILoggingOptions } from "./Logger";

describe("Logger", () => {
  let mockInfo: jest.Mock;
  let mockWarn: jest.Mock;
  let mockError: jest.Mock;
  let mockDebug: jest.Mock;
  let loggingOptions: ILoggingOptions;
  let logger: Logger;

  beforeEach(() => {
    mockInfo = jest.fn();
    mockWarn = jest.fn();
    mockError = jest.fn();
    mockDebug = jest.fn();

    loggingOptions = {
      info: mockInfo,
      warn: mockWarn,
      error: mockError,
      debug: mockDebug,
    };

    logger = new Logger(loggingOptions);
  });

  it("calls the info log function with the correct arguments", () => {
    const message = "test info message";
    const arg = "infoArg";
    logger.info(message, arg);

    expect(mockInfo).toHaveBeenCalledWith(message, arg);
  });

  it("calls the warn log function with the correct arguments", () => {
    const message = "test warn message";
    const arg = "warnArg";
    logger.warn(message, arg);

    expect(mockWarn).toHaveBeenCalledWith(message, arg);
  });

  it("calls the error log function with the correct arguments", () => {
    const message = "test error message";
    const arg = "errorArg";
    logger.error(message, arg);

    expect(mockError).toHaveBeenCalledWith(message, arg);
  });

  it("calls the debug log function with the correct arguments", () => {
    const message = "test debug message";
    const arg = "debugArg";
    logger.debug(message, arg);

    expect(mockDebug).toHaveBeenCalledWith(message, arg);
  });

  it("uses no-op functions when logging methods are not provided", () => {
    const noOpLogger = new Logger({});
    expect(() => {
      noOpLogger.info("no-op info");
      noOpLogger.warn("no-op warn");
      noOpLogger.error("no-op error");
      noOpLogger.debug("no-op debug");
    }).not.toThrow();
  });
});
