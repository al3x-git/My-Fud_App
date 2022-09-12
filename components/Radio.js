import { StyleSheet, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import React, { useContext } from 'react';
import { RadioContext } from '../contexts/RadioContext';
import { useNavigation } from '@react-navigation/native';

const Radio = ({ label, value }) => {
	const { checked, setChecked, hideDialog } = useContext(RadioContext);
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<RadioButton
				value={value}
				status={checked === value ? 'checked' : 'unchecked'}
				onPress={() => {
					setChecked(value);
					hideDialog();
					navigation.navigate('SearchPage', {
						title: label,
						mealType: value,
					});
				}}
			/>
			<Text>{label}</Text>
		</View>
	);
};

export default Radio;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});
