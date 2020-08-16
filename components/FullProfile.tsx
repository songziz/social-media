import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { Text, View } from '../components/Themed';
import MiniEvent from '../components/MiniEvent';
import MiniProfile from '../components/MiniProfile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import FullEvent from "../components/FullEvent"

const Stack = createStackNavigator();

function FullProfileStack({uid, currentUser, isFriends}: {uid: string, currentUser:boolean, isFriends: boolean}) {
  //TODO: replace with actual array of events based off of uid.
  const eventsArray = ['uid1', 'uid2', 'uid3', 'uid4', 'uid5'];
  return (
      <Stack.Navigator headerMode="none">
          <Stack.Screen name="FeedScreen">
              {() => Profile({uid: uid, eventsArray: eventsArray, currentUser: currentUser, isFriends: isFriends})}
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
    console.log('Logged out.');
  };

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
          <TouchableOpacity style={styles.friendRequestContainer} onPress={logOut}>
            <Text style={styles.friendRequestText}>log out</Text>
          </TouchableOpacity>
        }
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {eventsArray.map((uid) => (
          <MiniEvent uid={uid} key={'profile-event' + uid} displayUser={false} currentUser={false} navLink={'profile-event' + uid}/>
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
}); 