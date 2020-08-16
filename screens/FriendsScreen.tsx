import * as React from 'react';
import { StyleSheet, Modal, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import MiniProfile from '../components/MiniProfile';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FullProfile from '../components/FullProfile';
import { MonoText } from '../components/StyledText';
import { useState } from 'react';
import Navigation from '../navigation';
import { useNavigation } from '@react-navigation/native';
import { acceptFriendReq } from '../util/api-functions';

const Stack = createStackNavigator();


function FriendsStack({uid} : {uid: string}) {
    //TODO: replace with actual array of friends based off of uid.
    const friendsArray = ['uid1', 'uid2', 'uid3', 'uid4', 'uid5'];
    const [inputtedUsername, setInputtedUsername] = useState<string>('');

    return (
        <Stack.Navigator headerMode="none" initialRouteName="FriendsScreen">
            <Stack.Screen name="FriendsScreen">
                {() => Friends({friendsArray: friendsArray})} 
            </Stack.Screen>
            <Stack.Screen name="FriendRequestScreen">
                {() => {
                    const confirmFriend = ({uid}: {uid: string}) => {
                                                
                    }
                    const rejectFriend = ({uid}: {uid: string}) => {
                                                
                    }
                    return(

                        <ScrollView contentContainerStyle={{display: 'flex', alignItems: 'center'}}>
                            {friendsArray.map((uid) => (
                                <>
                                    <View style={[styles.addFriendContainer, {width: '95%'}]}>
                                        <TouchableOpacity style={styles.addFriendTouchable} onPress={() => confirmFriend({uid})}>
                                            <MonoText style={styles.addFriendText}>confirm</MonoText>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.addFriendTouchable} onPress={() => rejectFriend({uid})}>
                                            <MonoText style={styles.addFriendText}>reject</MonoText>
                                        </TouchableOpacity>
                                    </View>
                                    <MiniProfile uid={uid} key={'friends' + uid} touchable={false} navLink={'friends' + uid}/>
                                    <View style={styles.separator}/>
                                </>
                            ))}
                        </ScrollView>
                    );
                }}
            </Stack.Screen>
            <Stack.Screen name="AddFriendScreen">
                {() => {
                    
                    const sendFriendRequest = () => {
                        console.log('friend request sent ' + inputtedUsername.toLowerCase());
                        leaveScreen();
                    };

                    const leaveScreen= () => {
                        nav.navigate('FriendsScreen');
                        setInputtedUsername('');
                    }

                    const nav = useNavigation();
                
                    return (
                        <View style={styles.addFriendModalContainer}>
                            <MonoText style={styles.enterUsernameText}>enter username</MonoText>
                            <View style={styles.inputContainer}>
                                <Text style={styles.enterUsernameText}> @  </Text>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={text => setInputtedUsername(text)}
                                    value={inputtedUsername}
                                    placeholder='username'
                                />
                            </View>
                            <TouchableOpacity style={styles.addFriendTouchable} onPress={sendFriendRequest}>
                                <MonoText style={styles.addFriendText}>send friend request</MonoText>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.addFriendTouchable, {backgroundColor: 'orange'}]} onPress={leaveScreen}>
                                <MonoText style={styles.addFriendText}>cancel</MonoText>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            </Stack.Screen>
            {friendsArray.map((uid) => (
                <Stack.Screen
                    key={'friends' + uid}
                    name={'friends' + uid}
                >
                    {() => FullProfile({uid: uid, currentUser: false, isFriends: true})}
                </Stack.Screen>
            ))}
        </Stack.Navigator>
    )
}

const Friends = ({friendsArray}: {friendsArray: string[]}) => {
    const nav = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.addFriendContainer}>
                <TouchableOpacity style={styles.addFriendTouchable} onPress={() => nav.navigate('AddFriendScreen')}>
                    <MonoText style={styles.addFriendText}>+ add a friend</MonoText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addFriendTouchable} onPress={() => nav.navigate('FriendRequestScreen')}>
                    <MonoText style={styles.addFriendText}>incoming requests</MonoText>
                </TouchableOpacity>
            </View>
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
    addFriendContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 50,
        backgroundColor: 'pink',
        flexDirection: 'row',
    },
    addFriendModalContainer: {
        height: '40%',
        width: '80%',
        marginTop: '10%',
        backgroundColor: 'lightgray',
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    addFriendText: {
        fontSize: 16,
        color: 'black',
    },
    addFriendTouchable: {
        backgroundColor: 'lightblue',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5, 
    },
    container: {
        flex: 1,
    },
    enterUsernameText: {
        fontSize: 16,
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        width: '95%',
        backgroundColor: 'lightgray',
    },
    textInput: {
        height: '100%',
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '85%',
        paddingLeft: 3,
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
        backgroundColor: "white",
    },
});
