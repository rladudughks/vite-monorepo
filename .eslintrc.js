const path = require('path');

/* eslint-env node */
module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'plugin:import/typescript',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: [
      './tsconfig.json',
      './apps/**/tsconfig.json',
      './packages/**/tsconfig.json',
    ],
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error', 'debug', 'info'] }],
    'no-unused-vars': 'off',
    'import/no-unresolved': [
      'error',
      {
        ignore: ['.svg', '.png', 'jpg', 'jpeg'],
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error'],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    'no-restricted-imports': [
      'warn',
      {
        patterns: ['.*'],
      },
    ],
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
        groups: [
          ['builtin', 'external'],
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: 'next',
            group: 'builtin',
          },
          {
            pattern: 'react',
            group: 'builtin',
          },
          {
            pattern: '@monorepo/*/**',
            group: 'internal',
          },
          {
            pattern: 'src/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['src/**', '@monorepo/*/**'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/*.stories.js?(x)',
        '**/*.stories.ts?(x)',
        '**/.storybook/**/*.js?(x)',
        '**/.storybook/**/*.ts?(x)',
      ],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
      },
    },
    {
      files: [
        'packages/design-system/**/*.ts?(x)',
        'packages/design-system/**/*.js?(x)',
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(
              `${__dirname}/packages/design-system/tsconfig.json`,
            ),
          },
        },
      },
    },
    {
      files: ['apps/app-a/**/*.ts?(x)', 'apps/app-a/**/*.js?(x)'],
      settings: {
        'import/resolver': {
          typescript: {
            project: path.resolve(`${__dirname}/apps/app-a/tsconfig.json`),
          },
        },
      },
    },
  ],
};
