import './firebase';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';

//react navigation paper
import { Provider as PaperProvider } from 'react-native-paper';
import { CombinedDarkTheme, CombinedDefaultTheme } from './config/theme';

//Screens
import SignIn from './screens/SignIn';
import Profile from './screens/Profile';
import SignUp from './screens/SignUp';
import Splash from './screens/Splash';
import BMI from './screens/BMI';
import Medication from './screens/Medication';
import DiabetesType from './screens/DiabetesType';
import { BottomTab } from './components/navigation/BottomTab';

//context
import { AuthContext } from './contexts/AuthContext';
import { PreferencesContext } from './contexts/PreferencesContext';
import { RegisterContext } from './contexts/RegisterContext';

//create stack
const AuthStack = createStackNavigator();
const RootStack = createStackNavigator();

export default function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isThemeDark, setIsThemeDark] = useState(false);

	const [diabetesType, setDiabetesType] = useState(null);
	const [medication, setMedication] = useState(null);
	const [age, setAge] = useState(null);
	const [weight, setWeight] = useState(null);
	const [height, setHeight] = useState(null);
	const [sex, setSex] = useState(null);

	let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

	const toggleTheme = useCallback(() => {
		return setIsThemeDark(!isThemeDark);
	}, [isThemeDark]);

	const preferences = useMemo(
		() => ({
			toggleTheme,
			isThemeDark,
		}),
		[toggleTheme, isThemeDark]
	);

	const auth = useMemo(
		() => ({ isAuthenticated, setIsAuthenticated }),
		[isAuthenticated, setIsAuthenticated]
	);
	const register = useMemo(
		() => ({
			diabetesType,
			setDiabetesType,
			medication,
			setMedication,
			age,
			setAge,
			weight,
			setWeight,
			height,
			setHeight,
			sex,
			setSex,
		}),
		[
			diabetesType,
			setDiabetesType,
			medication,
			setMedication,
			age,
			setAge,
			weight,
			setWeight,
			height,
			setHeight,
			sex,
			setSex,
		]
	);

	useEffect(() => {
		StatusBar.setBarStyle(!isThemeDark ? 'dark-content' : 'light-content');
	}, [isThemeDark]);

	return (
		<RegisterContext.Provider value={register}>
			<PreferencesContext.Provider value={preferences}>
				<AuthContext.Provider value={auth}>
					<PaperProvider theme={theme}>
						<NavigationContainer theme={theme}>
							{isAuthenticated ? (
								<RootStack.Navigator
									screenOptions={{ headerShown: false }}
								>
									<RootStack.Group>
										<RootStack.Screen
											name="Main"
											component={BottomTab}
										/>
									</RootStack.Group>
									<RootStack.Group
										screenOptions={{
											headerShown: false,
											gestureEnabled: true,
											...TransitionPresets.ModalPresentationIOS,
											presentation: 'modal',
										}}
									>
										<RootStack.Screen
											name="Profile"
											component={Profile}
										/>
									</RootStack.Group>
								</RootStack.Navigator>
							) : (
								<AuthStack.Navigator
									initialRouteName="Splash"
									screenOptions={{
										headerShown: false,
										animationEnabled: false,
									}}
								>
									<AuthStack.Group
										screenOptions={{ headerShown: true }}
									>
										<AuthStack.Screen
											name="Type"
											component={DiabetesType}
											options={{ title: 'Diabetes Type' }}
										/>
										<AuthStack.Screen
											name="Medication"
											component={Medication}
										/>
										<AuthStack.Screen
											name="BMI"
											component={BMI}
											options={{
												title: 'BMI Calculator',
											}}
										/>
										<AuthStack.Screen
											name="SignUp"
											component={SignUp}
											options={{
												title: 'Create Account',
											}}
										/>
									</AuthStack.Group>
									<AuthStack.Screen
										name="Splash"
										component={Splash}
									/>
									<AuthStack.Screen
										name="SignIn"
										component={SignIn}
									/>
								</AuthStack.Navigator>
							)}
						</NavigationContainer>
					</PaperProvider>
				</AuthContext.Provider>
			</PreferencesContext.Provider>
		</RegisterContext.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
