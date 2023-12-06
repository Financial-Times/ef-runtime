import { render } from "preact/compat";
import EFUI from "./efui";
import { IComponentRegistry } from "../ComponentRegistry";

function init(registry: IComponentRegistry) {
  const efuiEl = document.createElement("div");
  efuiEl.id = "efui";
  document.body.appendChild(efuiEl);
  render(<EFUI componentRegistry={registry} />, efuiEl);
}

export default { init };
