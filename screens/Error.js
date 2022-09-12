import { Text } from 'react-native-paper';
import { View } from 'react-native';
import React from 'react';
import Container from '../components/Container';

const Error = ({ route }) => {
	const { error } = route.params;

	<Container>
		<View style={{ flex: 1, alignItems: 'center' }}>
			<Text>Oops an error occured</Text>
			<Text>{error.code}</Text>
			<Text>{error.message}</Text>
		</View>
	</Container>;
};

export default Error;
