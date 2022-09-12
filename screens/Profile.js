import React, { useContext, useEffect, useState } from 'react';
import Container from '../components/Container';
import Close from '../components/icons/Close';
import {
	Text,
	Button,
	TouchableRipple,
	Switch,
	useTheme,
	Avatar,
	List,
} from 'react-native-paper';
import { View } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { PreferencesContext } from '../contexts/PreferencesContext';
import { RegisterContext } from '../contexts/RegisterContext';

//firebase
import { getAuth, signOut } from 'firebase/auth';
const auth = getAuth();
//firestore
import { getDoc, getFirestore, doc } from 'firebase/firestore';
const db = getFirestore();

const Profile = ({ navigation }) => {
	const theme = useTheme();
	const { setIsAuthenticated } = useContext(AuthContext);
	const { toggleTheme, isThemeDark } = useContext(PreferencesContext);
	const {
		setAge,
		setDiabetesType,
		setHeight,
		setMedication,
		setSex,
		setWeight,
	} = useContext(RegisterContext);
	const [data, setData] = useState({});

	const handleLogout = async () => {
		try {
			await signOut(auth);
			setIsAuthenticated(false);
			setAge(null),
				setDiabetesType(null),
				setHeight(null),
				setMedication(null),
				setSex(null),
				setWeight(null);
		} catch (error) {
			alert(error.message);
		}
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				(async () => {
					const docRef = doc(db, 'user_info', user.uid);
					const docSnap = await getDoc(docRef);
					if (docSnap.exists()) {
						console.log('Profile: user_info:', docSnap.data());
						setData(docSnap.data());
					} else {
						console.log('Profile:user_info document not found!');
					}
				})();
			}
		});

		return unsubscribe;
	}, []);

	return (
		<>
			<Close onPress={() => navigation.goBack()} />
			{/* <View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					position: 'absolute',
					top: 0,
					right: 0,
					padding: 15,
				}}
			>
				<Text>{isThemeDark ? 'Dark' : 'Light'}</Text>
				<TouchableRipple>
					<Switch
						style={[{ backgroundColor: theme.colors.accent }]}
						color={theme.colors.secondary}
						value={isThemeDark}
						onValueChange={() => toggleTheme()}
					/>
				</TouchableRipple>
			</View> */}
			<Container>
				<Avatar.Image
					style={{ alignSelf: 'center', marginVertical: '10%' }}
					size={128}
					source={{
						uri: 'https://source.unsplash.com/random/?profile,displayPicture',
					}}
				/>

				<View>
					<Text>
						Full Name: {auth.currentUser?.displayName ?? 'user'}
					</Text>
					<Text>Age: {data.age}</Text>
					<Text>Diagnosis: {data.diabetesType}</Text>
					<Text>Management: {data.medication}</Text>
					<Text>Bmi: {data.bmi}</Text>
				</View>

				<Button
					style={{ marginVertical: '5%' }}
					mode="contained"
					buttonColor="#16A31C"
					onPress={() => handleLogout()}
				>
					Logout
				</Button>
			</Container>
		</>
	);
};

export default Profile;
