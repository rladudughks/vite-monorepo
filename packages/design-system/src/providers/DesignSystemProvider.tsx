import { CssBaseline } from '@mui/material';
import { SupportedColorScheme, type Theme } from '@mui/material/styles';
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  useColorScheme as useMaterialColorScheme,
} from '@mui/material/styles';
import { CssVarsProviderConfig } from '@mui/system';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale/ko';
import { PropsWithChildren, useEffect } from 'react';

import { createTheme } from 'design-system/providers/theme';

type ModeChangerProps = {
  mode?: SupportedColorScheme;
};
const SyncThemeMode = ({ mode = 'light' }: ModeChangerProps) => {
  const { setMode: setMaterialMode, setColorScheme: setMaterialColorScheme } =
    useMaterialColorScheme();

  useEffect(() => {
    setMaterialMode(mode);
    setMaterialColorScheme(mode);
  }, [mode, setMaterialColorScheme, setMaterialMode]);

  return null;
};

type DesignSystemProviderProps = {
  mode?: SupportedColorScheme;
  theme?: Theme;
} & CssVarsProviderConfig<SupportedColorScheme>;

const DesignSystemProvider = ({
  mode = 'light',
  children,
  theme: themeProp,
  ...other
}: PropsWithChildren<DesignSystemProviderProps>) => {
  const theme = createTheme({ theme: themeProp });

  return (
    <MaterialCssVarsProvider {...other} theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
        <CssBaseline enableColorScheme />

        <SyncThemeMode mode={mode} />

        {children}
      </LocalizationProvider>
    </MaterialCssVarsProvider>
  );
};

export default DesignSystemProvider;
