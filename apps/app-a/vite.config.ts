import path from 'path';
import { readdirSync } from 'fs';

import { Plugin, UserConfig, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { visualizer } from 'rollup-plugin-visualizer';

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

const rootAlias = generateAlias(files);
const packageProjects = getDirectories('../../packages');
const packagesAlias = packageProjects.flatMap((project) => {
  const alias = generateAlias(
    `../../packages/${project.name}/src`,
    `${project.name}/`,
  );
  return alias;
});
const alias = [...rootAlias, ...packagesAlias];

// https://vitejs.dev/config/
export default ({ mode }) => {
  const VITE_MODE = process.env.VITE_VERCEL_ENV || mode;
  process.env = {
    ...process.env,
    ...loadEnv(VITE_MODE, process.cwd()),
  };

  const isProduction = VITE_MODE === 'production';

  const config: UserConfig = {
    define: {
      __APP_ENV__: JSON.stringify(process.env.APP_ENV),
    },
    resolve: {
      alias,
    },
    // server: {
    //   port: 5173,
    // },
    // preview: {
    //   port: 4173,
    // },
    build: {
      sourcemap: true,
      rollupOptions: {
        input: {
          index: 'index.html',
        },
        output: {
          manualChunks: (id) => {
            const module = id.split('node_modules/')?.pop()?.split('/')[0];
            if (id.includes('node_modules')) return `vendor/${module}`;
          },
        },
        plugins: [visualizer() as unknown as Plugin],
      },
    },
    esbuild: {
      pure: isProduction ? ['console.log'] : [],
    },
    plugins: [
      react(),
      eslint({ cache: false, eslintPath: 'eslint' }),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }) as unknown as Plugin,
    ],
    // server: {
    //   proxy: {
    //     '/consent/template': {
    //       target: baseURL,
    //       rewrite: (path) => path.replace(/^\/api/, ''),
    //       changeOrigin: true,
    //       secure: false,
    //     },
    //   },
    // },
  };

  return defineConfig(config);
};
