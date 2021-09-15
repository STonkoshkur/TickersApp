module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.es',
          '.es6',
          '.mjs',
          '.json',
        ],
        root: ['.'],
        alias: {
          src: './src/',
          '@src': './src/',
        },
      },
    ],
    ['babel-plugin-root-import'],
  ],
};
