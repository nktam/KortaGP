import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig={
  appId: 'eus.f1.kortagp',
  appName: 'KortaGp',
  webDir: 'dist/kortagp/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
