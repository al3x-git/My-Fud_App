import React, { useEffect, useState } from 'react';
import Container from '../components/Container';
import { DataTable, Text, ActivityIndicator } from 'react-native-paper';
import { FlatList } from 'react-native';
import Constants from 'expo-constants';

const FoodItem = ({ route }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [results, setResults] = useState([]);
	const { food } = route.params;

	useEffect(() => {
		if (error) {
			navigation.navigate('ErrorPage', { error: error });
		}
	}, [error]);

	useEffect(() => {
		(async function () {
			try {
				setIsLoading(true);
				const url = `https://api.nal.usda.gov/fdc/v1/food/${food}?api_key=${Constants.manifest?.extra?.fdcApiKey}`;
				const response = await fetch(url);
				if (response.status >= 200 && response.status <= 299) {
					const result = await response.json();

					const data = result.foodNutrients
						.filter(({ amount }) => amount !== undefined)
						.map(({ nutrient, amount }) => ({
							name: nutrient.name,
							amount: Math.round(amount),
							units: nutrient.unitName,
						}));
					setResults(data);
				} else {
					const result = await response.json();

					if (result.error) {
						setError(result.error);
					} else {
						console.log('error', result);
					}
				}
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<Container>
			<Text
				style={{ alignSelf: 'center', marginVertical: 15 }}
				variant="titleMedium"
			>
				Nutrition per 100g
			</Text>

			<DataTable>
				<DataTable.Header>
					<DataTable.Title>Nutrient</DataTable.Title>
					<DataTable.Title numeric>Amount</DataTable.Title>
					<DataTable.Title numeric>Units</DataTable.Title>
				</DataTable.Header>
				{isLoading ? (
					<ActivityIndicator style={{ marginTop: 50 }} />
				) : (
					<FlatList
						data={results}
						renderItem={({ item }) => (
							<DataTable.Row>
								<DataTable.Cell>{item.name}</DataTable.Cell>
								<DataTable.Cell numeric>
									{item.amount}
								</DataTable.Cell>
								<DataTable.Cell numeric>
									{item.units}
								</DataTable.Cell>
							</DataTable.Row>
						)}
						keyExtractor={(item) => item.fdcId}
					/>
				)}
			</DataTable>
		</Container>
	);
};

export default FoodItem;
