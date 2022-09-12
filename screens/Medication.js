import { StyleSheet, View } from 'react-native';
import { Button, useTheme, Text } from 'react-native-paper';
import React, { useContext } from 'react';
import Container from '../components/Container';
import { RegisterContext } from '../contexts/RegisterContext';

const Medication = ({ navigation }) => {
	const { medication, setMedication } = useContext(RegisterContext);
	const theme = useTheme();

	return (
		<Container>
			<View style={{ flex: 1, justifyContent: 'space-around' }}>
				<Text variant="titleSmall" style={{ alignSelf: 'center' }}>
					What is your medication?
				</Text>
				<Button
					mode="contained"
					buttonColor={
						medication === 'pen/syringes' ? '#E8C341' : '#16A31C'
					}
					onPress={() => setMedication('pen/syringes')}
				>
					Pen/syringes
				</Button>
				<Button
					mode="contained"
					buttonColor={
						medication === 'insulin pump' ? '#E8C341' : '#16A31C'
					}
					onPress={() => setMedication('insulin pump')}
				>
					Insulin Pump
				</Button>
				<Button
					mode="contained"
					buttonColor={
						medication === 'no insulin' ? '#E8C341' : '#16A31C'
					}
					onPress={() => setMedication('no insulin')}
				>
					No Insulin
				</Button>
				<Button
					mode="contained"
					buttonColor={medication === 'pills' ? '#E8C341' : '#16A31C'}
					onPress={() => setMedication('pills')}
				>
					Pills
				</Button>

				<Button
					mode="contained"
					buttonColor="#16A31C"
					onPress={() => navigation.navigate('BMI')}
					disabled={!medication ? true : false}
				>
					Next
				</Button>
			</View>
		</Container>
	);
};

export default Medication;

const styles = StyleSheet.create({});
