module.exports = {
  extends: ['react-app', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
  },
  settings: {
    react: {
      version: '16'
    }
  },
  overrides: [
    {
      files: [
          '**/*.{ts, tsx}'
      ],
      parserOptions: {
        project: ['./packages/*/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    }
  ]
}