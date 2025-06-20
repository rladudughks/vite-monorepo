import path from 'path';
import { readdirSync } from 'fs';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true }).filter((dirent) =>
    dirent.isDirectory(),
  );
const generateAlias = (filePath: string, sep: string = '') => {
  return getDirectories(filePath).map((dirent) => ({
    find: `${sep}${dirent.name}`,
    replacement: path.resolve(__dirname, `${filePath}/${dirent.name}`),
  }));
};

const files = './src';
const split = __dirname.split('/');
const repositoryName = split[split.length - 1];
const generatedAlias = generateAlias(files, `${repositoryName}/`);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: generatedAlias,
  },
});
