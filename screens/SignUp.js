import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

//components
import FormInput from '../components/form/FormInput';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';

//context
import { AuthContext } from '../contexts/AuthContext';
import { RegisterContext } from '../contexts/RegisterContext';

//firebase
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
const auth = getAuth();

//firestore
import { setDoc, getFirestore, serverTimestamp, doc } from 'firebase/firestore';
const db = getFirestore();

//form validation
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import Logo from '../assets/logo-large.svg';

const formSchema = yup.object().shape({
	Name: yup.string().min(2).required(),
	Email: yup.string().email().required(),
	Password: yup.string().min(8).max(32).required(),
	ConfirmPassword: yup
		.string()
		.required()
		.oneOf([yup.ref('Password')], 'Passwords do not match'),
});

const SignUp = ({ navigation }) => {
	const { setIsAuthenticated } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);
	const { age, weight, height, medication, diabetesType } =
		useContext(RegisterContext);

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(formSchema),
	});

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setIsAuthenticated(true);
			}
		});

		return unsubscribe;
	}, []);

	const onSubmit = async ({ Name, Email, Password }) => {
		try {
			setLoading(true);
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				Email,
				Password
			);

			const user = userCredential.user;
			console.log('Registered with:', user.email);

			const bmi = calculateBMI(height, weight);

			const docRef = doc(db, 'user_info', user.uid);
			await setDoc(docRef, {
				diabetesType,
				medication,
				age,
				height,
				weight,
				bmi,
				createdAt: serverTimestamp(),
			});

			console.log('user info added to firestore');

			return updateProfile(auth.currentUser, {
				displayName: Name,
			});
		} catch (error) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	const calculateBMI = (height, weight) => {
		const bmi = weight / ((height / 100) * (height / 100));
		return Math.round(bmi * 100) / 100;
	};

	return (
		<KeyboardAvoidingContainer>
			<View style={styles.header}>
				<Logo width={230} height={60} />
			</View>
			<FormInput
				label="Name"
				control={control}
				errors={errors}
				name="Name"
			/>
			<FormInput
				type="email"
				label="Email"
				control={control}
				errors={errors}
				name="Email"
			/>
			<FormInput
				type="password"
				label="Password"
				control={control}
				errors={errors}
				name="Password"
			/>
			<FormInput
				type="password"
				label="Confirm Password"
				control={control}
				errors={errors}
				name="ConfirmPassword"
			/>

			<Button
				mode="contained"
				style={styles.submitBtn}
				onPress={handleSubmit(onSubmit)}
				loading={loading}
				buttonColor="#fff"
				textColor="#000"
			>
				Sign Up
			</Button>

			<Button
				textColor="#000"
				onPress={() => navigation.navigate('SignIn')}
			>
				Already Have an account? Sign In
			</Button>
		</KeyboardAvoidingContainer>
	);
};

export default SignUp;
const styles = StyleSheet.create({
	header: {
		alignSelf: 'center',
	},
	submitBtn: {
		marginVertical: 15,
	},
});
