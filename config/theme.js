import {
	MD3LightTheme as PaperDefaultTheme,
	MD3DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import merge from 'deepmerge';

const extend = (theme) => ({
	...theme,
	colors: {
		...theme.colors,

		secondary: '#16A31C',
		tertiary: '#EEB0B059',
		authSurface: '#F6EC8BCF',
		// primary: 'red',
		// primaryContainer: 'red',
		// secondary,
		// secondaryContainer: 'red',
		// tertiary,
		// tertiaryContainer: 'red',

		// surface: 'red',

		// surfaceVariant: 'red',
		// surfaceDisabled,
		// background: 'red',
		// error: 'red',
		// errorContainer: 'red',
		//onPrimary: 'red',
		//onPrimaryContainer: 'red',
		// onSecondary: 'red',
		// onSecondaryContainer: 'red',
		// onTertiary: 'red',
		// onTertiaryContainer: 'red',
		// onSurface: 'red',

		// onSurfaceVariant: 'red',
	},
	roundness: 3,
	containerWidth: 15,
});

const ExtendedPaperTheme = extend(PaperDefaultTheme);
const ExtendedPaperDarkTheme = extend(PaperDarkTheme);

const CombinedDefaultTheme = merge(ExtendedPaperTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(ExtendedPaperDarkTheme, NavigationDarkTheme);

export { CombinedDarkTheme, CombinedDefaultTheme };
