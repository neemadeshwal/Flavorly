import "dotenv/config";

export default {
  expo: {
    name: "Flavorly",
    slug: "flavorly",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    owner: "neemadeshwal",
    newArchEnabled: true, // keep the new architecture enabled
    scheme: "com.expo.flavorly",

    // iOS config
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.expo.flavorly",
      googleServicesFile: "./GoogleService-Info.plist",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },

    // Android config
    android: {
      package: "com.expo.flavorly",
      googleServicesFile: "./google-services.json",
      edgeToEdgeEnabled: true,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },

    // Web config
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },

    // Social integrations
    facebookAppId: "1836859623843054",
    facebookDisplayName: "RN SDK Demo",

    // Extra vars (from .env)
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

    // Plugins
    plugins: [
      "expo-router",
      "expo-secure-store",
      [
        "react-native-fbsdk-next",
        {
          appID: "1836859623843054",
          clientToken: "43c54a288d50f3bd39775421d99ddc01",
          displayName: "RN SDK Demo",
          scheme: "fb1836859623843054",
          advertiserIDCollectionEnabled: false,
          autoLogAppEventsEnabled: false,
          isAutoInitEnabled: true,
          iosUserTrackingPermission:
            "This identifier will be used to deliver personalized ads to you.",
        },
      ],
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "@react-native-google-signin/google-signin",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
    ],

    // Experiments
    experiments: {
      typedRoutes: true,
    },
  },
};
