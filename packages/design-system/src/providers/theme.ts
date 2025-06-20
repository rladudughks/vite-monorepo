import {
  type Theme,
  createTheme as materialCreateTheme,
} from '@mui/material/styles';
import * as _ from 'lodash-es';

import LinkBehavior from 'design-system/components/navigations/LinkBehavior';
import localization from 'design-system/providers/localizaion';

const defaultTheme = materialCreateTheme(
  {
    cssVariables: { colorSchemeSelector: 'data' },
    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: { fontSize: 'var(--Icon-fontSize, var(--joy-fontSize-xl2))' },
        },
      },
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        },
      },
    },
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: '#29978D',
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: '#29978D',
          },
        },
      },
    },
  },
  localization.datagridKoKR,
  localization.pickersKoKR,
  localization.materialKoKR,
);

export interface CreateThemeProps {
  theme?: Theme;
}

export const createTheme = (props?: CreateThemeProps) => {
  const { theme } = props || {};

  return theme ? _.merge(defaultTheme, theme) : defaultTheme;
};
