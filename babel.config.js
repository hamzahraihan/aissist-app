module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          path: '.env',
          moduleName: 'react-native-dotenv',
          verbose: false,
        },
      ],
    ],
  };
};
