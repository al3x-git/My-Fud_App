import { StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import { Button, TextInput } from 'react-native-paper';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';
import { SearchContext } from '../contexts/SearchContext';
import uuid from 'react-native-uuid';

const AddFood = ({ navigation }) => {
	const [name, setName] = useState();
	const [calories, setCalories] = useState();
	const [carbs, setCarbs] = useState();
	const { selected, setSelected } = useContext(SearchContext);

	const handlePress = () => {
		console.log('pressed');
		const data = {
			name,
			id: uuid.v4(),
			carbs,
			calories,
		};
		const isFound = selected.some(({ id }) => id === data.id);
		if (!isFound) {
			setSelected([...selected, data]);
		}
		navigation.goBack();
	};

	return (
		<KeyboardAvoidingContainer>
			<TextInput
				mode="outlined"
				label="Name"
				value={name}
				onChangeText={(text) => setName(text)}
				style={styles.input}
			/>

			<TextInput
				mode="outlined"
				label="Calories per  serving in Kcal"
				value={calories}
				onChangeText={(text) => setCalories(text)}
				keyboardType="numeric"
				style={styles.input}
			/>
			<TextInput
				mode="outlined"
				label="Carbs per serving in g"
				value={carbs}
				onChangeText={(text) => setCarbs(text)}
				keyboardType="numeric"
				style={styles.input}
			/>

			<Button
				disabled={!name || !calories || !carbs}
				style={styles.btn}
				mode="contained"
				onPress={handlePress}
			>
				Add
			</Button>
		</KeyboardAvoidingContainer>
	);
};

export default AddFood;

const styles = StyleSheet.create({
	input: {
		marginBottom: 15,
	},
	btn: {
		marginVertical: 15,
	},
});
