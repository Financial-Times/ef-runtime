export interface ILoggingOptions {
  info?: (message: string, ...args: any[]) => void;
  warn?: (message: string, ...args: any[]) => void;
  error?: (message: string, ...args: any[]) => void;
  debug?: (message: string, ...args: any[]) => void;
}

export class Logger {
  private infoLog: (message: string, ...args: any[]) => void;
  private warnLog: (message: string, ...args: any[]) => void;
  private errorLog: (message: string, ...args: any[]) => void;
  private debugLog: (message: string, ...args: any[]) => void;

  constructor(loggingOptions?: ILoggingOptions) {
    this.infoLog = loggingOptions?.info || console.info;
    this.warnLog = loggingOptions?.warn || console.warn;
    this.errorLog = loggingOptions?.error || console.error;
    this.debugLog = loggingOptions?.debug || console.debug;
  }

  info(message: string, ...args: any[]) {
    this.infoLog(message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.warnLog(message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.errorLog(message, ...args);
  }

  debug(message: string, ...args: any[]) {
    this.debugLog(message, ...args);
  }
}
