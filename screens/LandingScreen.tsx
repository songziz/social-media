import React from 'react';


import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, NavigationContainer } from "@react-navigation/native";

import Screen from "../components/Screen";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

function LandingStack() {
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
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => nav.navigate("Login")}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => nav.navigate("Register")}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Screen>
    )
}

export default function LandingScreen() {
    return (
        <LandingStack />
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "white",
        alignItems: "center",
        padding: 15,
        width: "100%",
    },
    buttonContainer: {
        width: "100%",
        padding: 15,
    },
    buttonText: {
        color: "black",
        fontSize: 20,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})