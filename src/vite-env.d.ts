/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_BASEURL: string
  // more env variables...
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
