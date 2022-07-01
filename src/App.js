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
import Toast from "react-native-toast-notifications";
enableFreeze(true);
const App = () => {
	const appState = useRef(AppState.currentState);
	const refToast = useRef(<Toast />);
	let TOAST_ID = null;
	global.showToast = (message = 'Simple Toast', duration = 3000, type = 'normal', placement = 'top') => {
		if (TOAST_ID != null) {
			refToast.current.update(TOAST_ID, message, { type: 'warning', duration: duration + 3000 })
			TOAST_ID = null;
			return false;
		}
		TOAST_ID = refToast.current.show(message, {
			type,//"normal | success | warning | danger | custom",
			placement,//"top | bottom",
			duration,
			offset: 30,
			animationType: 'slide-in',//"slide-in | zoom-in",
		});
		setTimeout(() => TOAST_ID = null, duration)
	}

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
			<Toast ref={refToast} />
		</View>
	)
};

const styles = StyleSheet.create({
	container: { flex: 1 },
})

export default App;
