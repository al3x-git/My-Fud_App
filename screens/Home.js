import React, { useState, useMemo, useEffect } from 'react';
import {
	useTheme,
	Text,
	Surface,
	ProgressBar,
	Portal,
} from 'react-native-paper';
import { StyleSheet, View, ScrollView, TextInput } from 'react-native';
import Dialog from '../components/Dialog';
import Container from '../components/Container';
import Accordion from '../components/Accordion';
import Swiper from '../components/calendar/Swiper';
import { subDays, isSameDay } from 'date-fns';
import { LogsContext } from '../contexts/LogsContext';

import {
	getDocs,
	getFirestore,
	collection,
	query,
	where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const auth = getAuth();
//init service
const db = getFirestore();
const collectionRef = collection(db, 'food_logs');

const Home = ({ navigation }) => {
	const theme = useTheme();
	const [bloodSugar, setBloodSugar] = useState('95');
	const [insulin, setInsulin] = useState('0.8');
	const [logs, setLogs] = useState([]);

	const logValues = useMemo(() => ({ logs, setLogs }), [logs, setLogs]);

	const arr = useMemo(
		() =>
			logs
				.filter(({ createdAt }) => {
					if (!createdAt) {
						return true;
					}
					return isSameDay(
						new Date(createdAt.seconds * 1000),
						new Date()
					);
				})
				.map(({ selected }) => {
					const carbs = selected.reduce(function (acc, obj) {
						return acc + obj.carbs;
					}, 0);
					const calories = selected.reduce(function (acc, obj) {
						return acc + obj.calories;
					}, 0);
					return {
						carbs,
						calories,
					};
				}),
		[logs]
	);

	const totalCarbs = useMemo(
		() =>
			arr.reduce(function (acc, obj) {
				return acc + obj.carbs;
			}, 0),
		[arr]
	);
	const totalCalories = useMemo(
		() =>
			arr.reduce(function (acc, obj) {
				return acc + obj.calories;
			}, 0),
		[arr]
	);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				console.log(user);
				const q = query(
					collectionRef,
					where('user_id', '==', user.uid)
				);
				getDocs(q)
					.then((snapshot) => {
						let arr = [];
						snapshot.docs.forEach((doc) =>
							arr.push({ id: doc.id, ...doc.data() })
						);
						arr.sort((x, y) => x.createdAt - y.createdAt).reverse();
						const filtered = arr.filter(
							({ user_id }) => user_id === user.uid
						);
						setLogs(filtered);
					})
					.catch((e) => alert(e.message));
			}
		});
		return unsubscribe;
	}, [logs]);

	return (
		<LogsContext.Provider value={logValues}>
			<Portal.Host>
				<ScrollView style={{ flex: 1 }}>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginBottom: '5%',
							backgroundColor: '#FBF6C7',
							padding: 15,
						}}
					>
						<View
							style={{
								alignItems: 'center',
							}}
						>
							<Surface
								style={[
									styles.surface,
									{ backgroundColor: '#F5E235' },
								]}
								elevation={4}
							>
								<TextInput
									keyboardType="numeric"
									style={styles.vitalText}
									value={bloodSugar}
									onChangeText={(text) => setBloodSugar(text)}
								/>

								<Text style={styles.vitalText}>ml/dl</Text>
							</Surface>
							<Text>Blood Sugar</Text>
						</View>
						<View style={{ alignItems: 'center' }}>
							<Surface
								style={[
									styles.surface,
									{ backgroundColor: '#44878B' },
								]}
								elevation={4}
							>
								<TextInput
									keyboardType="numeric"
									value={insulin}
									onChangeText={(text) => setInsulin(text)}
									style={styles.vitalText}
								/>

								<Text style={styles.vitalText}>Units</Text>
							</Surface>
							<Text>Insulin/Food</Text>
						</View>
					</View>
					<Container>
						<View style={styles.progress}>
							<Text>Calories</Text>
							<View style={{ width: '55%' }}>
								<ProgressBar
									color={theme.colors.tertiary}
									progress={totalCalories / 1200}
									style={{ height: 15 }}
								/>
							</View>
							<Text>{totalCalories}/1200g</Text>
						</View>
						<View style={styles.progress}>
							<Text>Carbs</Text>
							<View style={{ width: '58%' }}>
								<ProgressBar
									color={theme.colors.secondary}
									progress={totalCarbs / 90}
									style={{ height: 15 }}
								/>
							</View>
							<Text>{totalCarbs}/90g</Text>
						</View>
						<Accordion isOpen={true} title="Today Diet Plan">
							<Swiper date={new Date()} />
						</Accordion>
						<Accordion isOpen={true} title="Yesterday Diet Plan">
							<Swiper date={subDays(new Date(), 1)} />
						</Accordion>
					</Container>
					<Portal>
						<Dialog />
					</Portal>
				</ScrollView>
			</Portal.Host>
		</LogsContext.Provider>
	);
};

export default Home;
const styles = StyleSheet.create({
	surface: {
		padding: 8,
		height: 80,
		width: 80,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	progress: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		alignItems: 'center',
		marginBottom: '1%',
	},
});
