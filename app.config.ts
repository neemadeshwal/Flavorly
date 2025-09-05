import "dotenv/config";

export default {
  expo: {
    name: "Flavorly",
    slug: "Flavorly",
    version: "1.0.0",
    owner: "neemadeshwal",
    userInterfaceStyle: "automatic",
    newArchEnabled: false,
    android: {
      package: "com.expo.flavorly",
      googleServicesFile: "./google-services.json",
    },
    ios: {
      bundleIdentifier: "com.expo.flavorly",
      supportsTablet: true,
      googleServicesFile: "./GoogleService-Info.plist",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    extra: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,

      eas: {
        projectId: "4f73e7cb-fa89-4a2e-b7f2-d4a45fa24929",
      },
    },
  },
};
