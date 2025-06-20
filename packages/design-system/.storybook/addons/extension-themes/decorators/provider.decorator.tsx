import { StoryContext, StoryFn } from '@storybook/react';
import { useMemo } from 'storybook/internal/preview-api';

import {
  initializeThemeState,
  pluckThemeFromContext,
  useThemeParameters,
} from './helpers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Theme = Record<string, any>;
type ThemeMap = Record<string, Theme>;

export interface ProviderStrategyConfiguration {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Provider: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  globalStyles?: any[];
  defaultTheme?: string;
  themes?: ThemeMap;
  getModes?: (theme: Theme) => string[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pluckThemeFromKeyPairTuple = ([_, themeConfig]: [string, Theme]): Theme =>
  themeConfig;

// TODO check with @kasperpeulen: change the types so they can be correctly inferred from context e.g. <Story extends (...args: any[]) => any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withThemeFromJSXProvider = ({
  Provider,
  globalStyles,
  defaultTheme,
  themes = {},
  getModes,
}: ProviderStrategyConfiguration) => {
  const themeNames = Object.keys(themes);
  const initialTheme = defaultTheme || themeNames[0];
  const modes = getModes?.(themes[initialTheme]);
  const initialModes = modes?.[0];

  initializeThemeState(themeNames, initialTheme, modes, initialModes);

  // eslint-disable-next-line react/display-name
  return (Story: StoryFn, context: StoryContext) => {
    const { themeOverride, modeOverride } = useThemeParameters();
    const selected = pluckThemeFromContext(context);

    const providerProps = useMemo(() => {
      const selectedProps = (themeOverride && {
        theme: themeOverride,
        mode: modeOverride,
      }) ||
        selected || { theme: initialTheme };
      const pairs = Object.entries(themes);

      if (
        selectedProps.mode &&
        getModes?.(themes[selectedProps.theme])?.includes(selectedProps.mode)
      ) {
        return {
          theme:
            pairs.length === 1
              ? pluckThemeFromKeyPairTuple(pairs[0])
              : selectedProps,
          mode: selectedProps.mode,
        };
      }

      return {
        theme:
          pairs.length === 1
            ? pluckThemeFromKeyPairTuple(pairs[0])
            : selectedProps,
        mode: modeOverride,
      };
    }, [modeOverride, selected, themeOverride]);

    return (
      <Provider {...providerProps}>
        {globalStyles &&
          globalStyles.map((GlobalStyles, index) => (
            <GlobalStyles key={`GlobalStyles-${index}`} />
          ))}
        <Story />
      </Provider>
    );
  };
};
