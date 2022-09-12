import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import Logo from '../assets/logo-small.svg';
import { Button, TextInput, RadioButton } from 'react-native-paper';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';
import { RegisterContext } from '../contexts/RegisterContext';

const BMI = ({ navigation }) => {
	const { age, setAge, height, setHeight, weight, setWeight, sex, setSex } =
		useContext(RegisterContext);

	return (
		<KeyboardAvoidingContainer>
			<View
				style={{
					alignItems: 'center',
					marginVertical: '5%',
				}}
			>
				<Logo width={66} height={47} />
				<Text>
					Body Mass Calculator (BMI) calculates BMI values and
					Corresponding Body weight Status and the person's age.
				</Text>
			</View>

			<TextInput
				mode="outlined"
				label="Age"
				value={age}
				onChangeText={(text) => setAge(text)}
				keyboardType="numeric"
				theme={{ roundness: 10 }}
				outlineColor="#fff"
				style={{ backgroundColor: '#fff' }}
				activeOutlineColor="#16A31C"
			/>
			<TextInput
				mode="outlined"
				label="Height in centimeters"
				value={height}
				onChangeText={(text) => setHeight(text)}
				keyboardType="numeric"
				theme={{ roundness: 10 }}
				outlineColor="#fff"
				style={{ backgroundColor: '#fff' }}
				activeOutlineColor="#16A31C"
			/>
			<TextInput
				mode="outlined"
				label="Weight in Kgs"
				value={weight}
				outlineColor="#fff"
				style={{ backgroundColor: '#fff' }}
				activeOutlineColor="#16A31C"
				onChangeText={(text) => setWeight(text)}
				keyboardType="numeric"
				theme={{ roundness: 10 }}
			/>
			<RadioButton.Group
				onValueChange={(value) => setSex(value)}
				value={sex}
			>
				<RadioButton.Item color="#16A31C" label="Male" value="male" />
				<RadioButton.Item
					color="#16A31C"
					label="Female"
					value="female"
				/>
			</RadioButton.Group>

			<Button
				disabled={!age || !weight || !height || !sex}
				mode="contained"
				onPress={() => navigation.navigate('SignUp')}
				buttonColor="#16A31C"
			>
				Next
			</Button>
		</KeyboardAvoidingContainer>
	);
};

export default BMI;

const styles = StyleSheet.create({});
