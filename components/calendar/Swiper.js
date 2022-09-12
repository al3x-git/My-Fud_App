import { StyleSheet, View } from 'react-native';
import React, { useEffect, useContext } from 'react';
import PagerView from 'react-native-pager-view';
import Card from '../Card';

import { isSameDay } from 'date-fns';
import { LogsContext } from '../../contexts/LogsContext';

const Swiper = ({ date }) => {
	const { logs } = useContext(LogsContext);

	return (
		<PagerView style={styles.container}>
			{logs
				.filter(({ createdAt }) => {
					if (!date || !createdAt) {
						return true;
					}
					return isSameDay(new Date(createdAt.seconds * 1000), date);
				})
				.map(({ selected, mealType, createdAt }, i, arr) => {
					return (
						<View key={i}>
							<View style={styles.row}>
								<Card
									mealType={mealType}
									selected={selected}
									date={createdAt}
								/>
							</View>
						</View>
					);
				})}
		</PagerView>
	);
};

export default Swiper;

const styles = StyleSheet.create({
	container: {
		height: 220,
		width: '100%',
	},
	row: {
		flexDirection: 'row',
	},
});
