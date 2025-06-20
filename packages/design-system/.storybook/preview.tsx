import type { Preview } from '@storybook/react';
import * as _ from 'lodash-es';

import DesignSystemProvider from 'design-system/providers/DesignSystemProvider';
import themes from 'design-system/themes';

import {
  withThemeFromJSXProvider,
  preview as extensionThemesPreview,
} from './addons/extension-themes';

const preview: Preview = _.merge(
  {
    parameters: {
      actions: { argTypesRegex: '^on.*' },
      controls: {
        matchers: {
          color: /(background|color)$/i,
          date: /Date$/,
        },
      },
    },
    decorators: [
      withThemeFromJSXProvider({
        Provider: DesignSystemProvider,
        themes: themes,
        getModes: (theme) =>
          (theme.colorSchemes && Object.keys(theme.colorSchemes)) || [],
      }),
    ],
  },
  extensionThemesPreview.default,
);

export default preview;
