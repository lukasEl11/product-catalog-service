// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for parsing modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended', // ESLint recommended rules
    'plugin:@typescript-eslint/recommended', // TypeScript recommended rules
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier
  ],
  plugins: ['@typescript-eslint'], // TypeScript plugin
  rules: {
    // Add custom rules here
    '@typescript-eslint/no-unused-vars': 'warn', // Warns on unused variables
    '@typescript-eslint/no-explicit-any': 'off', // Allows the use of 'any'
    '@typescript-eslint/explicit-module-boundary-types': 'off', // No need to explicitly type module boundaries
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Apply these rules only to TypeScript files
      rules: {
        // TypeScript specific rules can be added here
      },
    },
  ],
};
