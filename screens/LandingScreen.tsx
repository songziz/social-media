import React from 'react';


import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, NavigationContainer } from "@react-navigation/native";

import Screen from "../components/Screen";
import { View, Text, Button } from "react-native";
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

function AppStack() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    )
}

function Landing() {
    const nav = useNavigation();

    return (
        <Screen>
            <View>
                <Text>
                    Log in using your email address and password.
        </Text>
                <View>
                    <Button
                        onPress={() => nav.navigate("Login")} title="Login">
                    </Button>
                    <Button onPress={() => nav.navigate("Register")} title="Register">
                    </Button>
                </View>
            </View>
        </Screen>
    )
}

export default function LandingScreen() {
    return (
        <AppStack />
    );
}