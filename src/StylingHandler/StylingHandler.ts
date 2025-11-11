import { Logger } from "../Logger";

type StyleStrategy = "shadow" | "light";

interface AddStylingOptions {
  /** Required for 'shadow': the component root whose subtree should be styled */
  containerSelector: string;
  /** 'shadow' (default) scopes styles; 'light' preserves original global behavior */
  strategy: StyleStrategy;
}

export interface IStylingHandler {
  addStyling(
    url: string,
    opts?: AddStylingOptions,
  ): Promise<void>;
}

export class StylingHandler implements IStylingHandler {
  private document: Document;
  private logger: Logger;

  constructor(document: Document, logger: Logger) {
    this.document = document;
    this.logger = logger;
  }

  async addStyling(
    url: string,
    opts?: AddStylingOptions,
  ): Promise<void> {
    try {
      if (opts?.strategy === "shadow") {
        const target = await this.waitForElement(opts?.containerSelector, { timeout: 10000 });
        if (!target) {
          throw new Error(`Container not found for selector: ${opts?.containerSelector}`);
        }
        const shadow = await this.wrapWithEfScope(target, url);
        this.logger.info?.(`Scoped style added (shadow): ${url}`, shadow);
        return;
      }

      // Light DOM: append once to <head>
      if (
        !this.document.querySelector(
          `link[rel="stylesheet"][data-href="${url}"]`,
        )
      ) {
        const link = this.document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        link.setAttribute("data-href", url); // dedupe marker
        this.document.head.appendChild(link);
        this.logger.info?.(`Global style added (light): ${url}`);
      }
    } catch (err) {
      this.logger.error?.(`Failed to add styling: ${url}`, err);
      throw err;
    }
  }

  /* -------------------- helpers -------------------- */

  /**
   * Replaces the container with <ef-scope>, attaches a shadow root,
   * injects the CSS, and moves the container INSIDE the shadow tree.
   * The host (<ef-scope>) takes the original container's place in the DOM.
   */
  private async wrapWithEfScope(container: HTMLElement, cssHref: string) {
    // Bail if already wrapped
    if ((container as any).__efScoped) return;
    (container as any).__efScoped = true;

    // 1) Create host and replace container in-place
    const host = document.createElement("ef-scope");

    const containerChild = container.childNodes;
    container.replaceWith(host); // host is now at the same DOM position

    // 2) Attach/open shadow
    const shadow = host.attachShadow({ mode: "open" });

    // 3) Load stylesheet (constructable sheet first, fallback to <style>)
    const supportsSheets =
      "adoptedStyleSheets" in (Document.prototype as any) &&
      "replaceSync" in (CSSStyleSheet.prototype as any);

    const cssText = await fetch(cssHref, { credentials: "include" }).then(
      (r) => {
        if (!r.ok)
          throw new Error(`Failed to fetch CSS ${cssHref} (${r.status})`);
        return r.text();
      },
    );

    if (supportsSheets) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(cssText);
      (shadow as any).adoptedStyleSheets = [
        ...((shadow as any).adoptedStyleSheets || []),
        sheet,
      ];
    } else {
      const styleEl = document.createElement("style");
      styleEl.textContent = cssText;
      shadow.appendChild(styleEl);
    }

    shadow.appendChild(container);
    return shadow;
  }

  private waitForElement(
    selector: string,
    { timeout = 10000 } = {},
  ): Promise<HTMLElement | null> {
    return new Promise((resolve) => {
      const existing = document.querySelector<HTMLElement>(selector);
      if (existing) return resolve(existing);

      const start = Date.now();
      const root = document.documentElement;

      const observer = new MutationObserver(() => {
        const el = document.querySelector<HTMLElement>(selector);
        if (el) {
          observer.disconnect();
          resolve(el);
        } else if (Date.now() - start > timeout) {
          observer.disconnect();
          resolve(null);
        }
      });

      observer.observe(root, { childList: true, subtree: true });

      // Safety timeout in case there are no mutations at all
      setTimeout(() => {
        observer.disconnect();
        resolve(document.querySelector<HTMLElement>(selector));
      }, timeout);
    });
  }
}
