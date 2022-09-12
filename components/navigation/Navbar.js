import { Appbar } from 'react-native-paper';

export function NavBar({ navigation, back, options, route }) {
	return (
		<Appbar.Header mode="center-aligned">
			{back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
			<Appbar.Content title={options.title} />
			{(route.name === 'HomePage' || route.name === 'LogsPage') && (
				<Appbar.Action
					icon="account"
					color="#16A31C"
					onPress={() => navigation.navigate('Profile')}
				/>
			)}
		</Appbar.Header>
	);
}
