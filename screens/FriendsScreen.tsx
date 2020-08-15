import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import MiniProfile from '../components/MiniProfile';
import { createStackNavigator } from '@react-navigation/stack';
import FriendInfoScreen from './FriendInfoScreen';

const Stack = createStackNavigator();

function FriendsStack() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="FriendsScreen" component={Friends} />
            <Stack.Screen name="FriendInfoScreen" component={FriendInfoScreen} />
        </Stack.Navigator>
    )
}

function Friends() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Friends</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <EditScreenInfo path="/screens/FriendsScreen.tsx" />
            <MiniProfile uid='sample' touchable={true} />
            <MiniProfile uid='sample' touchable={true} />
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
