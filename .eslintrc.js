// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'plugin:import/typescript', 'plugin:import/warnings', 'plugin:import/errors'],
  ignorePatterns: ['/dist/*'],
  settings: {
    'import/resolver': {
      node: {
        path: ['app'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'app/'],
      },
      typescript: {},
    },
  },
};
