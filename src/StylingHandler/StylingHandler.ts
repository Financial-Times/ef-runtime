import { Logger } from "../Logger";

export interface IStylingHandler {
  addStyling(url: string): void;
}

export class StylingHandler implements IStylingHandler {
  private document: Document;
  private logger: Logger;

  constructor(document: Document, logger: Logger) {
    this.document = document;
    this.logger = logger;
  }

  addStyling(url: string): void {
    try {
      const componentCSS = this.document.createElement("link");
      componentCSS.rel = "stylesheet";
      componentCSS.href = url;
      this.document.head.append(componentCSS);
      this.logger.info(`Styling added: ${url}`);
    } catch (error) {
      this.logger.error(`Failed to add styling: ${url}`, error);
    }
  }
}
