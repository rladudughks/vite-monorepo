import { SunIcon } from '@storybook/icons';
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
  MODE_SWITCHER_ID,
} from './constants';

const IconButtonLabel = styled.div(({ theme }) => ({
  fontSize: theme.typography.size.s2 - 1,
}));

const hasMultipleModes = (modesList: ThemeAddonState['modesList']) =>
  modesList.length > 1;
const hasTwoModes = (modesList: ThemeAddonState['modesList']) =>
  modesList.length === 2;

const ModeSwitcher = memo(() => {
  const { modeOverride, disable } = useParameter<ThemeParameters>(
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

  const [{ themeDefault, modesList, modeDefault }, updateState] =
    useAddonState<ThemeAddonState>(THEME_SWITCHER_ID, initializeThemeState);

  const isLocked = KEY in storyGlobals || !!modeOverride;

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

  const theme = selected?.theme || themeDefault;
  const modeName = selected?.mode || modeDefault;
  let label = '';
  if (isLocked) {
    label = 'Story override';
  } else if (modeName) {
    label = `${modeName} mode`;
  }

  if (disable) {
    return null;
  }

  if (hasTwoModes(modesList)) {
    const currentMode = selected?.mode || modeDefault;
    const alternateMode = modesList.find((mode) => mode !== currentMode);
    return (
      <IconButton
        disabled={isLocked}
        key={MODE_SWITCHER_ID}
        active={!modeOverride}
        title="Theme modes"
        onClick={() => {
          updateGlobals({ [KEY]: { theme, mode: alternateMode } });
        }}
      >
        <SunIcon />
        {label ? <IconButtonLabel>{label}</IconButtonLabel> : null}
      </IconButton>
    );
  }

  if (hasMultipleModes(modesList)) {
    return (
      <WithTooltip
        placement="top"
        trigger="click"
        closeOnOutsideClick
        tooltip={({ onHide }) => {
          return (
            <TooltipLinkList
              links={modesList.map((mode) => ({
                id: mode,
                title: mode,
                active: selected === mode,
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
          key={MODE_SWITCHER_ID}
          active={!modeOverride}
          title="Theme mode"
          disabled={isLocked}
        >
          <SunIcon />
          {label && <IconButtonLabel>{label}</IconButtonLabel>}
        </IconButton>
      </WithTooltip>
    );
  }

  return null;
});

ModeSwitcher.displayName = 'ModeSwitcher';

export default ModeSwitcher;
