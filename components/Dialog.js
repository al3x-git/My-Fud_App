import React, { useState, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog as D, Portal, Provider, FAB } from 'react-native-paper';
import Radio from './Radio';
import { RadioContext } from '../contexts/RadioContext';

const Dialog = () => {
	const [checked, setChecked] = useState(null);

	const [visible, setVisible] = useState(false);

	const showDialog = () => setVisible(true);

	const hideDialog = () => {
		setChecked(null);
		setVisible(false);
	};

	const radio = useMemo(
		() => ({ checked, setChecked, hideDialog }),
		[checked, setChecked, hideDialog]
	);

	return (
		<RadioContext.Provider value={radio}>
			<Provider>
				<View style={styles.container}>
					<FAB icon="plus" style={styles.fab} onPress={showDialog} />
					<Portal>
						<D visible={visible} onDismiss={hideDialog}>
							<D.Title>Meal type</D.Title>
							<D.Content>
								<Radio label="Breakfast" value="breakfast" />
								<Radio label="Lunch" value="lunch" />
								<Radio label="Dinner" value="dinner" />
								<Radio label="Snack" value="snack" />
							</D.Content>
							<D.Actions>
								<Button onPress={hideDialog}>Cancel</Button>
							</D.Actions>
						</D>
					</Portal>
				</View>
			</Provider>
		</RadioContext.Provider>
	);
};

export default Dialog;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	fab: {
		position: 'absolute',

		margin: 15,
		right: 0,
		bottom: 0,
		backgroundColor: '#16A31C',
	},
});
