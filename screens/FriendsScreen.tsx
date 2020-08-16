import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import MiniProfile from '../components/MiniProfile';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

function FriendsStack() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="FriendsScreen" component={Friends} />
        </Stack.Navigator>
    )
}

function Friends() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <MiniProfile uid='sample' touchable={true} />
                <MiniProfile uid='sample' touchable={true} />
                <MiniProfile uid='sample' touchable={true} />
                <MiniProfile uid='sample' touchable={true} />
                <MiniProfile uid='sample' touchable={true} />
                <MiniProfile uid='sample' touchable={true} />
                <MiniProfile uid='sample' touchable={true} />
                <MiniProfile uid='sample' touchable={true} />
                <MiniProfile uid='sample' touchable={true} />
                <MiniProfile uid='sample' touchable={true} />
                <MiniProfile uid='sample' touchable={true} />
                <MiniProfile uid='sample' touchable={true} />
                <MiniProfile uid='sample' touchable={true} />
            </ScrollView>
        </View>
    );
}

export default function FriendsScreen() {
    return (
        <FriendsStack />
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
