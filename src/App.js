/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef, } from 'react';
import { View, StatusBar, StyleSheet, AppState } from 'react-native';
import MainStackNavigator from '@Pages';
import { enableFreeze } from 'react-native-screens';
import { LogBox } from "react-native";
import notifee from '@notifee/react-native';
enableFreeze(true)
const App = () => {
	const appState = useRef(AppState.currentState);
	LogBox.ignoreLogs([
		"exported from 'deprecated-react-native-prop-types'.",
	])


	const onDisplayNotification = async () => {
		// Create a channel
		const channelId = await notifee.createChannel({
			id: 'default',
			name: 'Default Channel',
		});
		// Display a notification
		await notifee.displayNotification({
			title: 'Notification Title',
			body: 'Main body content of the notification',
			android: {
				channelId,
				smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
			},
		});
	}

	useEffect(() => {
		notifee.onForegroundEvent(({ type, detail }) => {
			console.log('onForegroundEvent', type, detail);
		});
		notifee.onBackgroundEvent(async ({ type, detail }) => {
			console.log('onBackgroundEvent: ', type, detail)
		});


		const subscription = AppState.addEventListener("change", async nextAppState => {
			if (nextAppState === "background") {
				onDisplayNotification()
			}
			appState.current = nextAppState;
		});

		return () => {
			subscription.remove();
		};
	}, []);
	return (
		<View style={styles.container}>
			<StatusBar
				animated={true}
				backgroundColor={'white'}
				barStyle={'dark-content'}
				showHideTransition={'fade'}
				hidden={false} />
			<MainStackNavigator />
		</View>
	)
};

const styles = StyleSheet.create({
	container: { flex: 1 },
})

export default App;
