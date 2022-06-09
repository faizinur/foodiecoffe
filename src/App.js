/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import MainStackNavigator from '@Pages';
import { enableFreeze } from 'react-native-screens';
import { LogBox } from "react-native";
enableFreeze(true)
const App = () => {
	LogBox.ignoreLogs([
		"exported from 'deprecated-react-native-prop-types'.",
	])
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
