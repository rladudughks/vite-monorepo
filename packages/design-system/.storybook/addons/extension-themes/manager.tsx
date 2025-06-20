import { addons, types } from 'storybook/internal/manager-api';

import {
  ADDON_ID,
  MODE_SWITCHER_ID,
  PARAM_KEY,
  THEME_SWITCHER_ID,
} from './constants';
import ModeSwitcher from './mode-switcher';
import ThemeSwitcher from './theme-switcher';

addons.register(ADDON_ID, () => {
  addons.add(THEME_SWITCHER_ID, {
    title: 'Themes',
    type: types.TOOL,
    match: ({ viewMode, tabId }) =>
      !!(viewMode && viewMode.match(/^(story|docs)$/)) && !tabId,
    render: ThemeSwitcher,
    paramKey: PARAM_KEY,
  });
  addons.add(MODE_SWITCHER_ID, {
    title: 'Theme Modes',
    type: types.TOOL,
    match: ({ viewMode, tabId }) =>
      !!(viewMode && viewMode.match(/^(story|docs)$/)) && !tabId,
    render: ModeSwitcher,
    paramKey: PARAM_KEY,
  });
});
