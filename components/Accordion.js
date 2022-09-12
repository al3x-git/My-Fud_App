import React, { useState } from 'react';
import { List } from 'react-native-paper';

const Accordion = ({ title, children, isOpen }) => {
	const [expanded, setExpanded] = useState(isOpen ? true : false);

	const handlePress = () => setExpanded(!expanded);

	return (
		<List.Accordion
			titleStyle={{ color: '#000' }}
			style={{ backgroundColor: '#B0E193', marginTop: '5%' }}
			title={title}
			expanded={expanded}
			onPress={handlePress}
		>
			{children}
		</List.Accordion>
	);
};

export default Accordion;
