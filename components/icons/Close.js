import React from 'react';
import { IconButton, useTheme } from 'react-native-paper';

const Close = ({ onPress }) => {
	const theme = useTheme();
	return (
		<IconButton
			icon="close"
			onPress={onPress}
			style={{
				marginVertical: theme.containerWidth,
			}}
		/>
	);
};

export default Close;
