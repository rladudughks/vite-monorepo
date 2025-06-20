import { PaintBrushIcon } from '@storybook/icons';
import { memo } from 'react';
import {
  IconButton,
  TooltipLinkList,
  WithTooltip,
} from 'storybook/internal/components';
import {
  addons,
  useAddonState,
  useChannel,
  useGlobals,
  useParameter,
} from 'storybook/internal/manager-api';
import { styled } from 'storybook/internal/theming';

import {
  DEFAULT_ADDON_STATE,
  DEFAULT_THEME_PARAMETERS,
  PARAM_KEY,
  THEME_SWITCHER_ID,
  ThemeAddonState,
  ThemeParameters,
  THEMING_EVENTS,
  GLOBAL_KEY as KEY,
} from './constants';

const IconButtonLabel = styled.div(({ theme }) => ({
  fontSize: theme.typography.size.s2 - 1,
}));

const hasMultipleThemes = (themesList: ThemeAddonState['themesList']) =>
  themesList.length > 1;
const hasTwoThemes = (themesList: ThemeAddonState['themesList']) =>
  themesList.length === 2;

const ThemeSwitcher = memo(() => {
  const { themeOverride, disable } = useParameter<ThemeParameters>(
    PARAM_KEY,
    DEFAULT_THEME_PARAMETERS,
  ) as ThemeParameters;
  const [{ [KEY]: selected }, updateGlobals, storyGlobals] = useGlobals();
  const channel = addons.getChannel();
  const fromLast = channel.last(THEMING_EVENTS.REGISTER_THEMES);
  const initializeThemeState = Object.assign({}, DEFAULT_ADDON_STATE, {
    themesList: fromLast?.[0]?.themes || [],
    themeDefault: fromLast?.[0]?.defaultTheme,
    modesList: fromLast?.[0]?.modes || [],
    modeDefault: fromLast?.[0]?.defaultMode,
  });

  const [{ themesList, themeDefault, modesList, modeDefault }, updateState] =
    useAddonState<ThemeAddonState>(THEME_SWITCHER_ID, initializeThemeState);

  const isLocked = KEY in storyGlobals || !!themeOverride;

  useChannel({
    [THEMING_EVENTS.REGISTER_THEMES]: ({
      themes,
      defaultTheme,
      modes,
      defaultMode,
    }) => {
      updateState((state) => ({
        ...state,
        themesList: themes,
        themeDefault: defaultTheme,
        modesList: modes,
        defaultMode,
      }));
    },
  });

  const mode = modeDefault || modesList?.[0];
  const themeName = selected?.theme || themeDefault;
  let label = '';
  if (isLocked) {
    label = 'Story override';
  } else if (themeName) {
    label = `${themeName} theme`;
  }

  if (disable) {
    return null;
  }

  if (hasTwoThemes(themesList)) {
    const currentTheme = selected?.theme || themeDefault;
    const alternateTheme = themesList.find((theme) => theme !== currentTheme);

    return (
      <IconButton
        disabled={isLocked}
        key={THEME_SWITCHER_ID}
        active={!themeOverride}
        title="Theme"
        onClick={() => {
          updateGlobals({
            [KEY]: { theme: alternateTheme, mode },
          });
        }}
      >
        <PaintBrushIcon />
        {label ? <IconButtonLabel>{label}</IconButtonLabel> : null}
      </IconButton>
    );
  }

  if (hasMultipleThemes(themesList)) {
    return (
      <WithTooltip
        placement="top"
        trigger="click"
        closeOnOutsideClick
        tooltip={({ onHide }) => {
          return (
            <TooltipLinkList
              links={themesList.map((theme) => ({
                id: theme,
                title: theme,
                active: selected === theme,
                onClick: () => {
                  updateGlobals({ [KEY]: { theme, mode } });
                  onHide();
                },
              }))}
            />
          );
        }}
      >
        <IconButton
          key={THEME_SWITCHER_ID}
          active={!themeOverride}
          title="Theme"
          disabled={isLocked}
        >
          <PaintBrushIcon />
          {label && <IconButtonLabel>{label}</IconButtonLabel>}
        </IconButton>
      </WithTooltip>
    );
  }

  return null;
});

ThemeSwitcher.displayName = 'ThemeSwitcher';

export default ThemeSwitcher;
