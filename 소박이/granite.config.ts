import { appsInToss } from '@apps-in-toss/framework/plugins';
import { router } from '@granite-js/plugin-router';
import { hermes } from '@granite-js/plugin-hermes';
import { defineConfig } from '@granite-js/react-native/config';

export default defineConfig({
  appName: 'sobagi',
  scheme: 'sobagi',
  plugins: [
    router(),
    hermes(),
    appsInToss({
      brand: {
        displayName: '소박이',
        primaryColor: '#6B7C4A',
        icon: '',
      },
      permissions: [],
    }),
  ],
});
