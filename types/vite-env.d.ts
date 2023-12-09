/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    unknown
  >;
  export default component;
}

interface ImportMetaEnv {
  APP_NAME: string;
  APP_API: string;
  APP_QQ: string;
  APP_TOKEN: string;
  [key: string]: string;
}

interface Window {
  TMap: any;
  _AMapSecurityConfig: any;
}
