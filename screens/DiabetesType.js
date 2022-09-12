import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import React, { useContext } from 'react';
import Container from '../components/Container';
import { RegisterContext } from '../contexts/RegisterContext';
const DiabetesType = ({ navigation }) => {
	const { diabetesType, setDiabetesType } = useContext(RegisterContext);
	const theme = useTheme();
	return (
		<Container>
			<View style={{ flex: 1, justifyContent: 'space-around' }}>
				<Text variant="titleSmall" style={{ alignSelf: 'center' }}>
					What is your diabetes type?
				</Text>
				<Button
					mode="contained"
					buttonColor={
						diabetesType === 'type 1' ? '#E8C341' : '#16A31C'
					}
					onPress={() => setDiabetesType('type 1')}
					style={styles.btn}
				>
					Type 1
				</Button>
				<Button
					mode="contained"
					buttonColor={
						diabetesType === 'type 2' ? '#E8C341' : '#16A31C'
					}
					onPress={() => setDiabetesType('type 2')}
					style={styles.btn}
				>
					Type 2
				</Button>

				<Button
					mode="contained"
					buttonColor="#16A31C"
					onPress={() => navigation.navigate('Medication')}
					disabled={!diabetesType ? true : false}
				>
					Next
				</Button>
			</View>
		</Container>
	);
};

export default DiabetesType;

const styles = StyleSheet.create({
	btn: {
		height: 100,
		justifyContent: 'center',
	},
});
