import {
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableWithoutFeedback,
	ScrollView,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { useHeaderHeight } from '@react-navigation/elements';

const KeyboardAvoidingContainer = ({ children }) => {
	const theme = useTheme();
	const height = useHeaderHeight();

	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={height}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={{ flex: 1, backgroundColor: '#F6EC8BCF' }}
		>
			<SafeAreaView
				style={[
					styles.container,
					{ paddingHorizontal: theme.containerWidth },
				]}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ScrollView contentContainerStyle={styles.inner}>
						{children}
					</ScrollView>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default KeyboardAvoidingContainer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	inner: {
		flex: 1,
		justifyContent: 'center',
	},
});
