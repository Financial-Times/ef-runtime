import { Component } from "preact/compat";
import { IComponentRegistry } from "../ComponentRegistry";
import styles from "./styles";

type EFUIProps = { componentRegistry: IComponentRegistry };
type EFUIState = {
  showComponents: boolean;
  needsRefresh: boolean;
  components: { [key: string]: string };
};

export default class EFUI extends Component<EFUIProps, EFUIState> {
  private localOverrides: { [key: string]: string };
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
        ...this.componentRegistry.getRegistry(),
        ...this.localOverrides,
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
        ...this.componentRegistry.getRegistry(),
        ...this.localOverrides,
      },
    });
    localStorage.setItem("ef-overrides", JSON.stringify(this.localOverrides));
  }

  addOverrides = (name: string, url: string) => {
    this.localOverrides[name] = url;
    this.updateComponents();
  };

  deleteOverride = (key: string) => {
    delete this.localOverrides[key];
    this.updateComponents();
  };

  onSubmit = (e: any) => {
    e.preventDefault();
    this.addOverrides(e.target.name.value, e.target.url.value);
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
              <input name="url" placeholder="Component URL" />
              <button>ADD</button>
            </form>
            {/* Components List  */}
            <table>
              <tr>
                <th></th> <th>Name</th> <th>URL</th> <th>Source</th>
              </tr>
              {Object.entries(this.state.components).map(
                ([name, url]: [string, string], index: number) => (
                  <tr>
                    <td>{index + 1}</td> <td>{name}</td> <td>{url}</td>
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
