import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

//components
import FormInput from '../components/form/FormInput';
import KeyboardAvoidingContainer from '../components/KeyboardAvoidingContainer';

//context
import { AuthContext } from '../contexts/AuthContext';

//firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth();

//form validation
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import Logo from '../assets/logo-large.svg';
import Login from '../assets/Login.svg';

const formSchema = yup.object().shape({
	Email: yup.string().email().required(),
	Password: yup.string().min(8).max(32).required(),
});

const SignIn = ({ navigation }) => {
	const { setIsAuthenticated } = useContext(AuthContext);
	const [loading, setLoading] = useState(false);

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

	const onSubmit = async ({ Email, Password }) => {
		try {
			setLoading(true);
			const userCredential = await signInWithEmailAndPassword(
				auth,
				Email,
				Password
			);
			const user = userCredential.user;
			console.log('Logged in with:', user.email);
		} catch (error) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<KeyboardAvoidingContainer>
			<View
				style={{
					alignItems: 'center',
					height: '40%',
					justifyContent: 'space-between',
					marginVertical: '5%',
				}}
			>
				<Logo width={230} height={90} />
				<Login width={147} height={147} />
			</View>

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

			<Button
				mode="contained"
				style={styles.btn}
				buttonColor="#fff"
				textColor="#000"
				onPress={handleSubmit(onSubmit)}
				loading={loading}
			>
				Sign In
			</Button>
			<Button
				textColor="#000"
				onPress={() => navigation.navigate('Type')}
			>
				Don't have an account? Sign Up
			</Button>
		</KeyboardAvoidingContainer>
	);
};

export default SignIn;
const styles = StyleSheet.create({
	header: {
		alignSelf: 'center',
	},
	submitBtn: {
		marginVertical: 15,
	},
	btn: {
		height: 60,
		justifyContent: 'center',
		marginBottom: '10%',
	},
});
