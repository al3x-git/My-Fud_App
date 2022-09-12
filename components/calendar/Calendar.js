import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import {
	format,
	eachWeekOfInterval,
	eachMonthOfInterval,
	subYears,
	addWeeks,
	getWeeksInMonth,
	startOfMonth,
	startOfWeek,
	isSameWeek,
	eachDayOfInterval,
	addDays,
} from 'date-fns';
import PagerView from 'react-native-pager-view';

import Accordion from '../Accordion';

import Swiper from './Swiper';

const months = eachMonthOfInterval({
	start: subYears(startOfMonth(new Date()), 1),
	end: startOfMonth(new Date()),
});

const dates = months.reduce((accumulator, current) => {
	const allWeeks = eachWeekOfInterval({
		start: startOfWeek(current),
		end: addWeeks(startOfWeek(current), 4),
	});
	accumulator.push(allWeeks);
	return accumulator;
}, []);

const Calendar = () => {
	const [date, setDate] = useState(new Date());
	const [days, setDays] = useState([]);
	const theme = useTheme();

	useEffect(() => {
		let isMounted = true;
		const days = eachDayOfInterval({
			start: startOfWeek(new Date()),
			end: addDays(startOfWeek(new Date()), 6),
		});
		if (isMounted) {
			setDays(days);
		}
		return () => {
			isMounted = false;
		};
	}, []);

	const handlePress = (d) => {
		setDate(d);
		const days = eachDayOfInterval({
			start: d,
			end: addDays(d, 6),
		});
		setDays(days);
	};

	return (
		<>
			<PagerView style={styles.container} initialPage={12}>
				{dates.map((month, i) => (
					<View key={i}>
						<View style={styles.header}>
							{
								<Text variant="titleMedium">
									{format(months[i], 'MMMM')}
								</Text>
							}
						</View>
						<View style={styles.row}>
							{month.map((week, i) => {
								const text = format(week, 'EEE');
								const dayOfWeek = format(week, 'd');
								return (
									<View
										key={i}
										style={{ alignItems: 'center' }}
									>
										<Text variant="titleSmall">{text}</Text>
										<Button
											buttonColor={
												isSameWeek(date, week)
													? '#E8C341'
													: '#16A31C'
											}
											textColor="#000"
											key={i}
											onPress={() => handlePress(week)}
										>
											{dayOfWeek}
										</Button>
									</View>
								);
							})}
						</View>
					</View>
				))}
			</PagerView>
			<FlatList
				data={days}
				renderItem={({ item }) => {
					const txt = format(item, 'EEEE MMMM d');
					return (
						<Accordion title={txt}>
							<Swiper date={item} />
						</Accordion>
					);
				}}
				keyExtractor={(item) => format(item, 'T')}
			/>
		</>
	);
};

export default Calendar;

const styles = StyleSheet.create({
	container: {
		height: 130,
		width: '100%',
	},
	header: {
		alignItems: 'center',
		padding: 10,
	},

	row: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});
