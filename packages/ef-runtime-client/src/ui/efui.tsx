import { Component } from "preact/compat";
import { IComponentRegistry } from "../ComponentRegistry";
import styles from "./styles";
import { EFComponentInfo } from "../types";

type EFUIProps = { componentRegistry: IComponentRegistry };
type EFUIState = {
  showComponents: boolean;
  needsRefresh: boolean;
  components: { [key: string]: EFComponentInfo };
};

export default class EFUI extends Component<EFUIProps, EFUIState> {
  private localOverrides: { [key: string]: EFComponentInfo };
  private componentRegistry: IComponentRegistry;

  constructor(props: EFUIProps) {
    super(props);
    this.componentRegistry = props.componentRegistry;
    this.localOverrides =
      JSON.parse(localStorage.getItem("ef-overrides")) || {};
    this.state = {
      showComponents: false,
      needsRefresh: false,
      components: {
        ...this.componentRegistry.getRegistry().components,
      },
    };
  }

  toggleEFUI = () => {
    this.setState({
      ...this.state,
      showComponents: !this.state.showComponents,
    });
  };

  updateComponents() {
    this.setState({
      ...this.state,
      needsRefresh: true,
      components: {
        ...this.componentRegistry.getRegistry().components,
      },
    });
    localStorage.setItem("ef-overrides", JSON.stringify(this.localOverrides));
  }

  addOverrides = (name: string, info: EFComponentInfo) => {
    this.localOverrides[name] = info;
    this.componentRegistry.applyOverrides(this.localOverrides);
    this.updateComponents();
  };

  deleteOverride = (name: string) => {
    delete this.localOverrides[name];
    this.updateComponents();
  };

  onSubmit = (e: any) => {
    e.preventDefault();
    const js = e.target.js.value;
    const css = e.target.css.value;
    const info: EFComponentInfo = {};
    if (js) info.js = js;
    if (css) info.css = css;
    this.addOverrides(e.target.name.value, info);
    e.target.reset();
  };

  render() {
    return (
      <>
        <style>{styles}</style>
        <button class="efui__trigger" onClick={this.toggleEFUI}>
          {this.state.showComponents ? "Close" : "EFUI"}
        </button>
        {this.state.showComponents && (
          <div class="efui__components">
            <h1>Extensible Frontends UI</h1>
            <form onSubmit={this.onSubmit}>
              <input name="name" placeholder="Component Name" />
              <input name="js" placeholder="Component JS URL" />
              <input name="css" placeholder="Component CSS URL" />
              <button>ADD</button>
            </form>
            {/* Components List  */}
            <table>
              <tr>
                <th></th> <th>Name</th> <th>JS</th> <th>CSS</th> <th>Source</th>
              </tr>
              {Object.entries(this.state.components).map(
                ([name, info]: [string, EFComponentInfo], index: number) => (
                  <tr>
                    <td>{index + 1}</td> <td>{name}</td>
                    <td>{info.js || ""}</td>
                    <td>{info.css || ""}</td>
                    {name in this.localOverrides ? (
                      <>
                        <td>Overrides</td>
                        <td>
                          <button
                            className="danger"
                            onClick={() => this.deleteOverride(name)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>Registry</td>
                        <td></td>
                      </>
                    )}
                  </tr>
                )
              )}
            </table>
            {/* Refresh Button  */}
            {this.state.needsRefresh && (
              <div>
                <p className="red">Please refresh to see the changes</p>
                <button className="danger" onClick={() => location.reload()}>
                  REFRESH
                </button>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
}
