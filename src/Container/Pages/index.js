import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '@RootNavigation';
import { log } from '@Utils';

import Splash from "./Splash";
import Login from "./Login";
import Home from "./Home";
import Register from "./Register";

const Stack = createNativeStackNavigator();

const animationSlide = {
    headerMode: 'none',
    headerShown: false,
}

export default stackProps => (
    <NavigationContainer
        ref={navigationRef}
        onReady={() => { log('Root Props : ', stackProps) }}>
        <Stack.Navigator
            initialRouteName={"Splash"}
            mode={"card"}
            ScreenOptions={{}}>
            <Stack.Screen name="Splash" options={() => (animationSlide)}>
                {props => <Splash  {...props} {...stackProps} />}
            </Stack.Screen>
            <Stack.Screen name="Login" options={() => (animationSlide)}>
                {props => <Login  {...props} {...stackProps} />}
            </Stack.Screen>
            <Stack.Screen name="Register" options={() => (animationSlide)}>
                {props => <Register  {...props} {...stackProps} />}
            </Stack.Screen>
            <Stack.Screen name="Home" options={() => (animationSlide)}>
                {props => <Home  {...props} {...stackProps} />}
            </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
)
export {
    Login,
    Splash,
    Home,
    Register,
}