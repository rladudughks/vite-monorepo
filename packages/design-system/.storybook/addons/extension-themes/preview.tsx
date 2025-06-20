import { Preview } from '@storybook/react';
import type { ProjectAnnotations, Renderer } from 'storybook/internal/types';

import { GLOBAL_KEY as KEY } from './constants';

const initialGlobals: ProjectAnnotations<Renderer>['initialGlobals'] = {
  [KEY]: { theme: '', mode: '' },
};

const preview: Preview = {
  initialGlobals,
};

export default preview;
