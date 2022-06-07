import 'react-native-gesture-handler';
/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { THEME as PAPER_THEME } from '@Utils';
import configureStore from '@Store';

const REDUX_STORE = configureStore();
const AppProvider = () => (
    <PaperProvider theme={PAPER_THEME}>
        <StoreProvider store={REDUX_STORE}>
            <App />
        </StoreProvider>
    </PaperProvider>)
AppRegistry.registerComponent(appName, () => AppProvider);