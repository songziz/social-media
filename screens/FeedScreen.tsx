import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import MiniEvent from '../components/MiniEvent';
import { ScrollView } from 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import FullEvent from "../components/FullEvent"

const Stack = createStackNavigator();

function FeedStack() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="FeedScreen" component={Feed} />
            <Stack.Screen name="EventScreen" component={FullEvent} />
        </Stack.Navigator>
    )
}

function Feed() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <MiniEvent uid='sample' displayUser={true} />
                <MiniEvent uid='sample' displayUser={true} />
                <MiniEvent uid='sample' displayUser={true} />
                <MiniEvent uid='sample' displayUser={true} />
                <MiniEvent uid='sample' displayUser={true} />
                <MiniEvent uid='sample' displayUser={true} />
            </ScrollView>
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    scroll: {
        width: '100%',
        alignItems: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
