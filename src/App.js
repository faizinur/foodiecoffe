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
enableFreeze(true)
const App = () => {
	const appState = useRef(AppState.currentState);
	LogBox.ignoreLogs([
		"exported from 'deprecated-react-native-prop-types'.",
	])

	useEffect(() => {


		const subscription = AppState.addEventListener("change", async nextAppState => {
			if (nextAppState === "background") {
				console.log('lagi di background')
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
