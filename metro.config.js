/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * SVG transformer is used to support .svg files
 * https://github.com/kristerkari/react-native-svg-transformer#for-react-native-v057-or-newer--expo-sdk-v3100-or-newer
 *
 * @format
 */
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
