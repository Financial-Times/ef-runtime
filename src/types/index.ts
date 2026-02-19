export interface EFComponentInfo {
  js?: string;
  css?: string;
}

export interface EFRegistryDependency {
  name: string;
  url: string;
  type: "js" | "css";
}

export interface EFRegistryInfo {
  dependencies: { [key: string]: EFRegistryDependency };
  components: { [key: string]: EFComponentInfo };
}
