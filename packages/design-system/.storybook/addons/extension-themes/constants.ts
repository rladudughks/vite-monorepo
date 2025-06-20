export const PARAM_KEY = 'extension-themes';
export const ADDON_ID = `monorepo/${PARAM_KEY}`;
export const THEME_SWITCHER_ID = `${ADDON_ID}/theme-switcher`;
export const MODE_SWITCHER_ID = `${ADDON_ID}/mode-switcher`;
export const GLOBAL_KEY = 'extension-theme';

export interface ThemeAddonState {
  themesList: string[];
  themeDefault?: string;
  modesList: string[];
  modeDefault?: string;
}

export const DEFAULT_ADDON_STATE: ThemeAddonState = {
  themesList: [],
  themeDefault: undefined,
  modesList: [],
  modeDefault: undefined,
};

export interface ThemeParameters {
  themeOverride?: string;
  disable?: boolean;
  modeOverride?: string;
}

export const DEFAULT_THEME_PARAMETERS: ThemeParameters = {};

export const THEMING_EVENTS = {
  REGISTER_THEMES: `${ADDON_ID}/REGISTER_THEMES`,
} as const;
