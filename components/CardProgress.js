import { View } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import React from 'react';

const CardProgress = ({ title, amount, units, color, total }) => {
	progress = amount / total;
	return (
		<View>
			<Text>{`${title} ${amount} ${units}`}</Text>
			<ProgressBar progress={progress} color={color} />
		</View>
	);
};

export default CardProgress;
