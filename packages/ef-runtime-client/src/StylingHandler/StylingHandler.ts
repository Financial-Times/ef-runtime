export interface IStylingHandler {
  addStyling(url: string): void;
}

export class StylingHandler implements IStylingHandler {
  private document: Document;

  constructor(document: Document) {
    this.document = document;
  }

  addStyling(url: string): void {
    const componentCSS = this.document.createElement("link");
    componentCSS.rel = "stylesheet";
    componentCSS.href = `${url}`;
    this.document.head.append(componentCSS);
  }
}
