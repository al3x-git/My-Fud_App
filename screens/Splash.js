import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import React from 'react';
import Logo from '../assets/logo-large.svg';
import Container from '../components/Container';
import { SafeAreaView } from 'react-native-safe-area-context';

const Splash = ({ navigation }) => {
	const theme = useTheme();
	const handleLogin = () => {
		navigation.navigate('SignIn');
	};
	const getStarted = () => {
		navigation.navigate('Type');
	};

	return (
		<SafeAreaView
			style={{
				justifyContent: 'center',
				flex: 1,
				backgroundColor: theme.colors.authSurface,
			}}
		>
			<Container>
				<View style={{ alignItems: 'center', marginVertical: '20%' }}>
					<Logo width={230} height={90} />
					<View style={{ padding: '5%' }}>
						<View style={{ alignItems: 'center' }}>
							<Text variant="headlineSmall">
								Manage your daily diet with
							</Text>
							<Text variant="headlineSmall">myFud App</Text>
							<Text
								variant="headlineSmall"
								style={{ marginTop: '10%' }}
							>
								Be Better a Day at a Time
							</Text>
						</View>
					</View>
				</View>
				<View style={{ height: '20%', justifyContent: 'space-evenly' }}>
					<Button
						style={styles.btn}
						mode="contained"
						buttonColor="#fff"
						textColor="#000"
						onPress={getStarted}
					>
						Get Started
					</Button>
					<Button
						style={styles.btn}
						mode="contained"
						buttonColor="#fff"
						textColor="#000"
						onPress={handleLogin}
					>
						Login
					</Button>
				</View>
			</Container>
		</SafeAreaView>
	);
};

export default Splash;

const styles = StyleSheet.create({
	btn: {
		height: 60,
		justifyContent: 'center',
		marginBottom: '10%',
	},
});
