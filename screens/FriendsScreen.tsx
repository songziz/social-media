import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import MiniProfile from '../components/MiniProfile';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import FullProfile from '../components/FullProfile';

const Stack = createStackNavigator();

function FriendsStack({uid} : {uid: string}) {
    //TODO: replace with actual array of friends based off of uid.
    const friendsArray = ['uid1', 'uid2', 'uid3', 'uid4', 'uid5'];
    return (
        <Stack.Navigator headerMode="none" initialRouteName="FriendsScreen">
            <Stack.Screen name="FriendsScreen">
                {() => Friends({friendsArray: friendsArray})} 
            </Stack.Screen>
            {friendsArray.map((uid) => (
                <Stack.Screen
                    key={'friends' + uid}
                    name={'friends' + uid}
                >
                    {() => FullProfile({uid: uid, currentUser: false})}
                </Stack.Screen>
            ))}
        </Stack.Navigator>
    )
}

function Friends({friendsArray}: {friendsArray: string[]}) {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                {friendsArray.map((uid) => (
                    <MiniProfile uid={uid} key={'friends' + uid} touchable={true} navLink={'friends' + uid}/>
                ))}
            </ScrollView>
        </View>
    );
}

export default function FriendsScreen({uid}: {uid: string}) {
    return (
        <FriendsStack uid={uid} />
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
