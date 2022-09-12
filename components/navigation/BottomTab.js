import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

//stacks
import { HomeStackScreen, LogsStackScreen } from './Stacks';
//create Tabs
const Tabs = createBottomTabNavigator();

export const BottomTab = () => {
	const theme = useTheme();

	const options = ({ route }) => ({
		headerShown: false,
		tabBarIcon: ({ color, size }) => {
			let iconName;
			if (route.name === 'HomeTab') {
				iconName = 'home-filled';
			} else if (route.name === 'LogsTab') {
				iconName = 'calendar-today';
			}
			return <MaterialIcons name={iconName} size={size} color={color} />;
		},
		tabBarActiveTintColor: theme.colors.secondary,
		tabBarInactiveTintColor: '#000',
	});

	return (
		<Tabs.Navigator screenOptions={options}>
			<Tabs.Screen
				name="HomeTab"
				component={HomeStackScreen}
				options={{ tabBarLabel: 'Home' }}
			/>

			<Tabs.Screen
				name="LogsTab"
				component={LogsStackScreen}
				options={{ tabBarLabel: 'Logs' }}
			/>
		</Tabs.Navigator>
	);
};
