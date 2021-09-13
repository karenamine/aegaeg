const { dirNames } = require('./webpack/helpers.conf');

const settings = {
  react: {
    version: 'detect', // Automatically detect the react version, will be set by default in the next major version.
  },

  'import/resolver': 'webpack', // Take all defaults
};

const env = {
  browser: true,
  es2021: true,
};

const parserOptions = {
  sourceType: 'module',

  ecmaFeatures: {
    jsx: true,
  },
};

const noUnusedExpressions = ['error', { allowTernary: true, allowShortCircuit: true }];

const baseRules = {
  'no-console': 'off',
  'no-param-reassign': 'off',
  'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
  'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  'func-names': 'off',
  'no-restricted-globals': ['error', 'event'],
  'import/prefer-default-export': 'off',
  'import/no-extraneous-dependencies': 'off',
  'no-continue': 'off',
  'no-restricted-syntax': 'off',
  'class-methods-use-this': 'off',
  'no-use-before-define': ['error', { functions: false }],
  'no-unused-expressions': 'off', // Disable the rule to enable for a specific parser later.

  // Does not work with typescript yet.
  'padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      prev: ['singleline-const', 'singleline-let', 'singleline-var'],
      next: '*',
    },

    {
      blankLine: 'always',
      prev: '*',
      next: ['singleline-const', 'singleline-let', 'singleline-var'],
    },

    {
      blankLine: 'any',
      prev: ['singleline-const', 'singleline-let', 'singleline-var'],
      next: ['singleline-const', 'singleline-let', 'singleline-var'],
    },

    {
      blankLine: 'always',

      prev: [
        'multiline-const',
        'multiline-let',
        'multiline-var',
        'multiline-expression',
        'multiline-block-like',
        'class',
      ],

      next: '*',
    },

    {
      blankLine: 'always',
      prev: '*',

      next: [
        'multiline-const',
        'multiline-let',
        'multiline-var',
        'multiline-expression',
        'multiline-block-like',
        'class',
      ],
    },

    // There is no 'multiline-export' option for more precise customization.
    { blankLine: 'always', prev: '*', next: 'export' },
    { blankLine: 'always', prev: 'export', next: '*' },
    { blankLine: 'any', prev: 'export', next: 'export' },

    { blankLine: 'always', prev: ['case', 'default'], next: '*' },
    { blankLine: 'always', prev: '*', next: 'return' },
  ],
};

const clientRules = {
  ...baseRules,
  'react/prop-types': 'off',
  // To use new JSX transform.
  'react/jsx-uses-react': 'off',
  'react/react-in-jsx-scope': 'off',
};

const getExtends = (...extraExtends) => [
  'airbnb-base',
  'plugin:react/recommended',
  'plugin:react-hooks/recommended',
  'plugin:jsx-a11y/recommended',
  ...extraExtends,
  'plugin:prettier/recommended', // Must be last to override other formatting rules.
];

module.exports = {
  overrides: [
    {
      files: `./${dirNames.src}/**/*.js`,
      parser: '@babel/eslint-parser',
      env,
      settings,
      parserOptions,
      extends: getExtends(),
      plugins: ['@babel'],

      rules: {
        ...clientRules,
        '@babel/no-unused-expressions': noUnusedExpressions,
      },
    },

    {
      files: `./${dirNames.src}/**/*.{ts,tsx}`,
      parser: '@typescript-eslint/parser',
      settings,
      env,

      parserOptions: {
        ...parserOptions,
        project: './tsconfig.json',
      },

      extends: getExtends(
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ),

      rules: {
        ...clientRules,

        'import/extensions': [
          'error',
          'ignorePackages',

          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],

        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-expressions': noUnusedExpressions,
        'no-useless-constructor': 'off', // Disable to add support for 'Parameter Properties' (shorthand for constructor parameters).
        '@typescript-eslint/restrict-template-expressions': 'off',
      },
    },

    // Simple config for nodejs files like webpack and netlify functions.
    {
      files: '**/*.js',
      excludedFiles: `./${dirNames.src}/**/*.js`,
      parser: '@babel/eslint-parser',

      env: {
        es2021: true,
        node: true,
      },

      parserOptions: {
        sourceType: 'module',
      },

      extends: [
        'airbnb-base',
        'plugin:node/recommended',
        'plugin:prettier/recommended', // Must be last to override other formatting rules.]
      ],

      plugins: ['@babel'],

      rules: {
        ...baseRules,
        '@babel/no-unused-expressions': noUnusedExpressions,
        'global-require': 'off', // Is deprecated
        'node/no-unpublished-require': 'off',
      },
    },
  ],

  reportUnusedDisableDirectives: true,
};
