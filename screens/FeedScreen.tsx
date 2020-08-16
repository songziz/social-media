import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import MiniEvent from '../components/MiniEvent';
import { ScrollView } from 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import FullEvent from "../components/FullEvent"

const Stack = createStackNavigator();

function FeedStack({ uid }: { uid: string }) {
    //TODO: replace with actual array of events based off of uid.
    const eventsArray = ['uid1', 'uid2', 'uid3', 'uid4', 'uid5'];
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="FeedScreen">
                {() => Feed({ eventsArray: eventsArray })}
            </Stack.Screen>
            {eventsArray.map((uid) => (
                <Stack.Screen
                    key={'event' + uid}
                    name={'event' + uid}
                >
                    {() => FullEvent({ uid: uid, currentUser: false })}
                </Stack.Screen>
            ))}
        </Stack.Navigator>
    )
}

function Feed({ eventsArray }: { eventsArray: string[] }) {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                {eventsArray.map((uid) => (
                    <MiniEvent uid={uid} key={'event' + uid} displayUser={true} currentUser={false} navLink={'event' + uid}/>
                ))}
            </ScrollView>
        </View>
    );
}

export default function FeedScreen({ uid }: { uid: string }) {
    return (
        <FeedStack uid={uid} />
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
