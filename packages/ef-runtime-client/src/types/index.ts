
export interface EFComponentInfo {
  js?: string;
  css?: string;
}

export interface EFRegistryInfo {
  dependencies: { [key: string]: string };
  components: { [key: string]: EFComponentInfo };
}
