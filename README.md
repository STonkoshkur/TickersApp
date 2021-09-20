# Trading Test app

## Includes:

- [React Native](https://reactnative.dev/)
- Drawer and Stack-based navigation using [React Navigation v6](https://reactnavigation.org/docs/getting-started)
- [TypeScript](https://www.typescriptlang.org/)
- Enviroment variables management using [react-native-config](https://github.com/luggit/react-native-config)
- [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/)
- Pre-commit hooks
- [Polygon.io](https://polygon.io/). Using free-account, that allows only [5 requests per minute](https://polygon.io/pricing).
- API-client based on [Axios](https://axios-http.com/)
- Queries and Cache management using [React Query](https://react-query.tanstack.com/)
- Map view using [react-native-maps](https://github.com/react-native-maps/react-native-maps)
- [Address geocoding](https://www.npmjs.com/package/react-native-geocoding)
- Line chart component based on [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit)
- Phone numbers international formatting
- UI Skeleton using [react-native-skeleton-placeholder](https://www.npmjs.com/package/react-native-skeleton-placeholder)
- SVG support using [react-native-svg](https://github.com/react-native-svg/react-native-svg)
- Vector font icons using [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

## QUICK START
0. Environment requirements:

   - [Node.js (v12 or newer)](https://nodejs.org/en/)
   - [Yarn](https://yarnpkg.com/)
   - [NPX](https://nodejs.dev/learn/the-npx-nodejs-package-runner)
   - [Watchman](https://facebook.github.io/watchman/)
   - [CocoaPods](https://cocoapods.org/)

1. Clone the repository and create the .env file from .env.example:

   ```bash
   git clone https://github.com/STonkoshkur/TickersApp.git TestRnApp
   cd TestRnApp/
   cp .env.example .env
   ```

2. Install the dependencies (npm packages and Pods):

   ```bash
   yarn && npx pod-install
   ```


3. That's all. Now, you can run app using:

   ```bash
   npx react-native run-ios
   npx react-native run-android
   ```
