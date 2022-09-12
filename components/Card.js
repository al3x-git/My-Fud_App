import React, { useState } from 'react';
import { View } from 'react-native';
import {
	Card,
	Text,
	useTheme,
	Avatar,
	TouchableRipple,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uuid from 'react-native-uuid';

import CardProgress from './CardProgress';

const MyCard = ({ mealType, selected }) => {
	const [image, setImage] = useState(null);
	const [done, setDone] = useState(false);

	const theme = useTheme();
	const carbs = selected.reduce(function (acc, obj) {
		return acc + obj.carbs;
	}, 0);
	const calories = selected.reduce(function (acc, obj) {
		return acc + obj.calories;
	}, 0);

	const pickImage = async () => {
		try {
			setDone(false);
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});
			if (!result.cancelled) {
				const blob = await new Promise((resolve, reject) => {
					const xhr = new XMLHttpRequest();
					xhr.onload = function () {
						resolve(xhr.response);
					};
					xhr.onerror = function (e) {
						console.log(e);
						reject(new TypeError('Network request failed'));
					};
					xhr.responseType = 'blob';
					xhr.open('GET', result.uri, true);
					xhr.send(null);
				});

				const fileRef = ref(getStorage(), `images/${uuid.v4()}`);
				await uploadBytes(fileRef, blob);
				const downloadURL = await getDownloadURL(fileRef);
				setImage(downloadURL);
			}
			setDone(true);
		} catch (error) {
			console.log(error);
			alert('Upload failed, sorry :(');
		}
	};

	return (
		<Card style={{ flex: 1, height: 300, overflow: 'scroll' }}>
			<Card.Title
				title={mealType}
				right={() => <Text>{calories} Kcal</Text>}
				rightStyle={{ padding: 15 }}
			/>
			<Card.Content>
				<View style={{ flexDirection: 'row' }}>
					<View style={{ flex: 1, marginRight: '5%' }}>
						{selected.map(({ name }) => (
							<Text>{name}</Text>
						))}
					</View>
					<View style={{ flex: 1 }}>
						<CardProgress
							title="Calories"
							amount={Math.round(calories * 100) / 100}
							units="kcal"
							color={theme.colors.tertiary}
							total={1200}
						/>
						<CardProgress
							title="Carbs"
							amount={Math.round(carbs * 100) / 100}
							units="g"
							color={theme.colors.primary}
							total={90}
						/>
						<TouchableRipple onPress={pickImage}>
							<Avatar.Image
								style={{
									alignSelf: 'center',
									marginVertical: '10%',
									backgroundColor: '#16A31C',
								}}
								size={64}
								source={{
									uri: image,
								}}
							/>
						</TouchableRipple>
					</View>
				</View>
			</Card.Content>
		</Card>
	);
};

export default MyCard;
