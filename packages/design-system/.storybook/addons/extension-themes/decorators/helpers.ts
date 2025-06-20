import { addons, useParameter } from 'storybook/internal/preview-api';
import type { StoryContext } from 'storybook/internal/types';

import type { ThemeParameters } from '../constants';
import {
  DEFAULT_THEME_PARAMETERS,
  GLOBAL_KEY,
  PARAM_KEY,
  THEMING_EVENTS,
} from '../constants';

export const pluckThemeFromContext = ({
  globals,
}: StoryContext): { theme: string; mode: string } => {
  return globals[GLOBAL_KEY] || '';
};

export const useThemeParameters = (): ThemeParameters => {
  return useParameter<ThemeParameters>(
    PARAM_KEY,
    DEFAULT_THEME_PARAMETERS,
  ) as ThemeParameters;
};

export const initializeThemeState = (
  themeNames: string[],
  defaultTheme: string,
  modeNames?: string[],
  defaultMode?: string,
) => {
  addons.getChannel().emit(THEMING_EVENTS.REGISTER_THEMES, {
    defaultTheme,
    themes: themeNames,
    modes: modeNames,
    defaultMode,
  });
};
