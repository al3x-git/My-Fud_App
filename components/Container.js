import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

const Container = ({ children }) => {
	const theme = useTheme();
	return (
		<View
			style={[
				styles.container,
				{ marginHorizontal: theme.containerWidth },
			]}
		>
			{children}
		</View>
	);
};

export default Container;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
