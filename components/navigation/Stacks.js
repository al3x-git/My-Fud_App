import { createStackNavigator } from '@react-navigation/stack';

//components
import Home from '../../screens/Home';
import { NavBar } from './Navbar';
import Search from '../../screens/Search';
import AddFood from '../../screens/AddFood';
import Error from '../../screens/Error';
import FoodItem from '../../screens/FoodItem';
import Logs from '../../screens/Logs';

// create stack
const HomeStack = createStackNavigator();
const LogsScreenStack = createStackNavigator();

const headerConfig = {
	// ...TransitionPresets.SlideFromRightIOS,
	// headerTitleAlign: 'center',
	// headerTitle: (props) => <Logo width={120} height={50} {...props} />,
	// headerLeft: () => <Menu />,
	// headerRight: () => <User />,
	// headerStyle: {
	// 	backgroundColor: '#f4511e',
	// },
	header: (props) => <NavBar {...props} />,
	headerMode: 'float',
	animationEnabled: false,
};

export const HomeStackScreen = () => (
	<HomeStack.Navigator
		initialRouteName="HomePage"
		screenOptions={headerConfig}
	>
		<HomeStack.Screen
			name="HomePage"
			component={Home}
			options={{ title: 'Home' }}
		/>
		<HomeStack.Screen
			name="SearchPage"
			component={Search}
			options={({ route }) => ({ title: route.params.title })}
		/>
		<HomeStack.Screen
			name="AddFoodPage"
			component={AddFood}
			options={{ title: 'Add Food' }}
		/>
		<HomeStack.Screen
			name="FoodItemPage"
			component={FoodItem}
			options={({ route }) => ({ title: route.params.title })}
		/>
		<HomeStack.Screen
			name="ErrorPage"
			component={Error}
			options={{ headerShown: false }}
		/>
	</HomeStack.Navigator>
);

export const LogsStackScreen = () => (
	<LogsScreenStack.Navigator
		screenOptions={headerConfig}
		initialRouteName="LogsPage"
	>
		<LogsScreenStack.Screen
			name="LogsPage"
			component={Logs}
			options={{ title: 'Log Book' }}
		/>
	</LogsScreenStack.Navigator>
);
