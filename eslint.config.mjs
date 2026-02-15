import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import n from 'eslint-plugin-n'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...typescriptEslint.configs['flat/recommended'],
  {
    files: ['**/*.ts'],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      import: importPlugin,
      n,
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      'import/no-cycle': 'error',
      'n/no-extraneous-import': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['test/**'],

    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
]
