import * as React from 'react';
import { StyleSheet, ScrollView, TextInput } from 'react-native';

import { Text, View } from '../components/Themed';
import MiniEvent from '../components/MiniEvent';
import MiniProfile from '../components/MiniProfile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import FullEvent from "../components/FullEvent"
import { useState } from 'react';
import { MonoText } from './StyledText';
import { useNavigation } from '@react-navigation/native';

import { auth, firebase } from "../firebase";

const Stack = createStackNavigator();

function FullProfileStack({uid, currentUser, isFriends}: {uid: string, currentUser:boolean, isFriends: boolean}) {
  //TODO: replace with actual array of events based off of uid.
  const eventsArray = ['uid1', 'uid2', 'uid3', 'uid4', 'uid5'];
  const [inputtedTitle, setInputtedTitle] = useState<string>('');
  const [inputtedDescription, setInputtedDescription] = useState<string>('');
  const [inputtedOpenings, setInputtedOpenings] = useState<string>('');

  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
        <Stack.Screen name="AddEventScreen">
          {() => {     

            const postEvent = () => {
              leaveScreen();
            }

            const leaveScreen= () => {
                nav.navigate('ProfileScreen');
                setInputtedTitle('');
                setInputtedDescription('');
                setInputtedOpenings('3');
            }

            const nav = useNavigation();
        
            return (
              <View style={styles.addFriendModalContainer}>
                  <MonoText style={styles.enterUsernameText}>enter event info</MonoText>
                  <TextInput
                      style={styles.textInput}
                      onChangeText={text => setInputtedTitle(text)}
                      value={inputtedTitle}
                      placeholder='Title'
                      returnKeyType='done'
                  />
                  <TextInput
                      style={styles.textInput}
                      onChangeText={text => setInputtedDescription(text)}
                      value={inputtedDescription}
                      placeholder='Description'
                      returnKeyType='done'
                  />
                  <TextInput
                      style={styles.textInput}
                      onChangeText={text => setInputtedOpenings(text)}
                      value={inputtedOpenings}
                      placeholder='Number of Openings'
                      keyboardType='number-pad'
                      returnKeyType='done'
                  />
                  <TouchableOpacity style={styles.addFriendTouchable} onPress={postEvent}>
                      <MonoText style={styles.addFriendText}>post event</MonoText>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.addFriendTouchable, {backgroundColor: 'orange'}]} onPress={leaveScreen}>
                      <MonoText style={styles.addFriendText}>cancel</MonoText>
                  </TouchableOpacity>
              </View>
            )
          }}
        </Stack.Screen>
        <Stack.Screen name="ProfileScreen">
          {() => Profile({uid: uid, eventsArray: eventsArray, currentUser: currentUser, isFriends: isFriends})}
        </Stack.Screen>
        <Stack.Screen name="RecentsScreen">
          {() => {
            return(
              <ScrollView contentContainerStyle={{display: 'flex', alignItems: 'center'}}>
                {eventsArray.map((uid) => (
                  <MiniEvent uid={uid} displayUser={true} currentUser={false} navLink={''} />
                ))}
              </ScrollView>
            );
          }}
        </Stack.Screen>
        {eventsArray.map((uid) => (
          <Stack.Screen
              key={'profile-event' + uid}
              name={'profile-event' + uid}
          >
              {() => FullEvent({uid: uid, currentUser: false})}
          </Stack.Screen>
        ))}
    </Stack.Navigator>
  )
};

function Profile({uid, eventsArray, currentUser=false, isFriends=false}: {uid: string, eventsArray: string[], currentUser: boolean, isFriends: boolean}) {
  
  const sendFriendRequest = () => {
    console.log('Friend request sent.');
  };

  const unfriend = () => {
    console.log('Unfriended.');
  };

  const logOut = () => {
    auth.signOut();
  };

  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.stickyProfile}>
        <MiniProfile uid={uid} touchable={false} navLink={''}/>
        {!currentUser && 
          (isFriends ?
            <TouchableOpacity style={styles.friendRequestContainer} onPress={unfriend}>
              <Text style={styles.friendRequestText}>unfriend</Text>
            </TouchableOpacity>
          :
            <TouchableOpacity style={styles.friendRequestContainer} onPress={sendFriendRequest}>
              <Text style={styles.friendRequestText}>send friend request</Text>
            </TouchableOpacity>
          )
        }
        {currentUser &&
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.friendRequestContainer} onPress={() => nav.navigate('AddEventScreen')}>
              <Text style={styles.friendRequestText}>post event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.friendRequestContainer} onPress={() => nav.navigate('RecentsScreen')}>
              <Text style={styles.friendRequestText}>interested</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.friendRequestContainer} onPress={logOut}>
              <Text style={styles.friendRequestText}>log out</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {eventsArray.map((uid) => (
          <MiniEvent uid={uid} key={'profile-event' + uid} displayUser={!currentUser} currentUser={currentUser} navLink={'profile-event' + uid}/>
        ))}
      </ScrollView>
    </View>
  );
}

export default function FullProfile({uid, currentUser=false, isFriends=false}: {uid: string, currentUser: boolean, isFriends: boolean}) {
  return (
    <FullProfileStack uid={uid} currentUser={currentUser} isFriends={isFriends}/>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'pink',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  container: {
    flex: 1,
  },
  friendRequestContainer: {
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    borderColor: 'white',
    borderWidth: 2,
  },
  friendRequestText: {
    fontSize: 16,
    color: 'black',
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
  stickyProfile: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'pink',
    paddingVertical: 8,
  },
  addFriendContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
   
},
addFriendModalContainer: {
    width: '80%',
    marginTop: '10%',
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '80%',
},
addFriendText: {
    fontSize: 16,
},
addFriendTouchable: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5, 
},
enterUsernameText: {
  fontSize: 16,
},
inputContainer: {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 40,
  width: '100%',
  backgroundColor: 'lightgray',
  alignSelf: 'center',
},
textInput: {
  alignSelf: 'center',
  backgroundColor: 'white',
  width: '90%',
  paddingLeft: 3,
  paddingVertical: 7,
  fontSize: 16,
},
}); 