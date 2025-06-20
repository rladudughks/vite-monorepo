/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Default
  readonly VITE_API_URL: string;

  // MUI
  readonly VITE_MUI_LICENSE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
