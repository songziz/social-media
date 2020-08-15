import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import MiniEvent from '../components/MiniEvent';

import { createStackNavigator } from '@react-navigation/stack';
import EventScreen from "../screens/EventScreen";

const Stack = createStackNavigator();

function FeedStack() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="FeedScreen" component={Feed} />
            <Stack.Screen name="EventScreen" component={EventScreen} />
        </Stack.Navigator>
    )
}

function Feed() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feed</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <EditScreenInfo path="/screens/FeedScreen.tsx" />
            <MiniEvent uid='sample' displayUser={true} />
        </View>
    );
}

export default function FeedScreen() {
    return (
        <FeedStack />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
