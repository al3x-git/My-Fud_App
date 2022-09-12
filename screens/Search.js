import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { Searchbar, ActivityIndicator, Chip, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import SearchList from '../components/SearchList';
import { SearchContext } from '../contexts/SearchContext';

//firebase
import { getAuth } from 'firebase/auth';
const auth = getAuth();

//firestore
import {
	addDoc,
	getFirestore,
	serverTimestamp,
	collection,
} from 'firebase/firestore';
const db = getFirestore();

const Search = ({ navigation, route }) => {
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [results, setResults] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [selected, setSelected] = useState([]);
	const [uploading, setUploading] = useState(false);

	const onChangeSearch = (query) => setSearchQuery(query);

	useEffect(() => {
		if (error) {
			navigation.navigate('ErrorPage', { error: error });
		}
	}, [error]);

	useEffect(() => {
		fetchData(searchQuery);
	}, [searchQuery]);

	const fetchData = async (searchQuery) => {
		try {
			setError(null);
			setIsLoading(true);
			const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${Constants.manifest?.extra?.fdcApiKey}&query=${searchQuery}&dataType=Foundation`;

			const response = await fetch(url);
			if (response.status >= 200 && response.status <= 299) {
				const result = await response.json();

				console.log('res', result);
				setIsLoading(false);
				setResults(result.foods);
			} else {
				const result = await response.json();

				if (result.error) {
					setError(result.error);
					setIsLoading(false);
				} else {
					console.log('error', result);
				}
			}
		} catch (error) {
			console.log('err', error);
		}
	};

	const search = useMemo(
		() => ({ selected, setSelected }),
		[selected, setSelected]
	);

	const handleCloseChip = (item) => {
		const filtered = selected.filter(({ id }) => id !== item.id);
		setSelected(filtered);
	};

	const handleSubmit = () => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				(async () => {
					try {
						const collectionRef = collection(db, 'food_logs');
						const data = {
							user_id: auth.currentUser.uid,
							selected: selected,
							mealType: route?.params?.mealType,
							createdAt: serverTimestamp(),
						};
						console.log(data);
						setUploading(true);
						await addDoc(collectionRef, data);

						console.log('food logs added to firestore');
					} catch (error) {
						alert(error.message);
					} finally {
						setUploading(false);
						setTimeout(() => {
							setSelected([]);
						}, 100);
					}
				})();
			}
		});
	};

	return (
		<SearchContext.Provider value={search}>
			<View style={{ flex: 1 }}>
				{selected && selected.length > 0 && (
					<>
						<View
							style={{
								flexDirection: 'row',
								flexWrap: 'wrap',
								padding: '5%',
							}}
						>
							{selected.map((item, i) => (
								<Chip
									key={i}
									style={{
										width: '40%',
										marginRight: '2%',
										marginBottom: '2%',
									}}
									onClose={() => handleCloseChip(item)}
								>
									{item.name}
								</Chip>
							))}
						</View>
						<Button loading={uploading} onPress={handleSubmit}>
							Done
						</Button>
					</>
				)}

				<Searchbar
					placeholder="Search for food"
					onChangeText={onChangeSearch}
					value={searchQuery}
				/>

				{isLoading ? (
					<ActivityIndicator style={{ marginTop: 50 }} />
				) : (
					<SearchList results={results} />
				)}
			</View>
		</SearchContext.Provider>
	);
};

export default Search;

const styles = StyleSheet.create({});
