import 'dotenv/config';

export default {
	expo: {
		name: 'my-fud',
		slug: 'my-fud',
		version: '1.0.0',
		orientation: 'portrait',
		icon: './assets/icon.png',
		userInterfaceStyle: 'light',
		splash: {
			image: './assets/splash.png',
			resizeMode: 'contain',
			backgroundColor: '#ffffff',
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ['**/*'],
		ios: {
			supportsTablet: true,
		},
		android: {
			package: 'com.myFud.myFud',
			versionCode: 1,
			adaptiveIcon: {
				foregroundImage: './assets/adaptive-icon.png',
				backgroundColor: '#FFFFFF',
			},
		},
		web: {
			favicon: './assets/favicon.png',
		},
		extra: {
			firebaseApiKey: process.env.FIREBASE_API_KEY,
			firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
			firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
			firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
			firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
			firebaseAppId: process.env.FIREBASE_APP_ID,
			firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
			fdcApiKey: process.env.FDC_API_KEY,
			eas: {
				projectId: '6caebb84-7b20-4f11-89cb-56f1ed185bbf',
			},
		},
	},
};
