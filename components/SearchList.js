import { FlatList, View } from 'react-native';
import {
	List,
	Text,
	Button,
	IconButton,
	TouchableRipple,
} from 'react-native-paper';
import React, { useContext } from 'react';
import Container from './Container';
import { useNavigation } from '@react-navigation/native';
import { SearchContext } from '../contexts/SearchContext';

const SearchList = ({ results }) => {
	const { selected, setSelected } = useContext(SearchContext);
	const navigation = useNavigation();

	const handlePress = ({ description, fdcId, foodNutrients }) => {
		const getCalories = (d) => {
			const arr = d.filter(({ unitName }) => unitName === 'KCAL');
			if (arr.length === 0) {
				return 0;
			} else {
				const obj = arr[0];
				console.log('obj', obj);
				return obj.value;
			}
		};

		const getCarbs = (d) => {
			const arr = d.filter(
				({ nutrientName }) =>
					nutrientName === 'Carbohydrate, by difference'
			);
			if (arr.length === 0) {
				return 0;
			} else {
				const obj = arr[0];
				console.log('obj', obj);
				return obj.value;
			}
		};

		const data = {
			name: description,
			id: fdcId,
			carbs: getCarbs(foodNutrients),
			calories: getCalories(foodNutrients),
		};
		console.log(' data', data);

		const isFound = selected.some(({ id }) => id === data.id);
		if (!isFound) {
			setSelected([...selected, data]);
		}
	};

	if (results.length > 0) {
		return (
			<Container>
				<FlatList
					data={results}
					renderItem={({ item }) => (
						<TouchableRipple
							onPress={() =>
								navigation.navigate('FoodItemPage', {
									title: item.description,
									food: item.fdcId,
								})
							}
						>
							<List.Section>
								<List.Item
									title={item.description}
									right={(props) => (
										<IconButton
											icon="plus"
											mode="contained"
											size={20}
											onPress={() => handlePress(item)}
											{...props}
										/>
									)}
								/>
							</List.Section>
						</TouchableRipple>
					)}
					keyExtractor={(item) => item.fdcId}
				/>
			</Container>
		);
	} else {
		return (
			<Container>
				<View
					style={{
						justifyContent: 'space-evenly',
						height: '100%',
					}}
				>
					<Text style={{ alignSelf: 'center' }}>
						No results found
					</Text>
					{/* <Button
						onPress={() => navigation.navigate('AddFoodPage')}
						mode="contained"
					>
						Enter manually
					</Button> */}
				</View>
			</Container>
		);
	}
};

export default SearchList;
