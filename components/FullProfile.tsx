import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { Text, View } from '../components/Themed';
import MiniEvent from '../components/MiniEvent';
import MiniProfile from '../components/MiniProfile';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function FullProfile({ uid, currentUser = false }: { uid: string, currentUser: boolean }) {

  const sendFriendRequest = () => {
    console.log('Friend request sent.');
  };

  const logOut = () => {
    console.log('Logged out.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.stickyProfile}>
        <MiniProfile uid={uid} touchable={false} navLink="" />
        {!currentUser &&
          <TouchableOpacity style={styles.friendRequestContainer} onPress={sendFriendRequest}>
            <Text style={styles.friendRequestText}>send friend request</Text>
          </TouchableOpacity>
        }
        {currentUser &&
          <TouchableOpacity style={styles.friendRequestContainer} onPress={logOut}>
            <Text style={styles.friendRequestText}>log out</Text>
          </TouchableOpacity>
        }
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <MiniEvent uid='sample' displayUser={false} currentUser={currentUser} navLink="" />
        <MiniEvent uid='sample' displayUser={false} currentUser={currentUser} navLink="" />
        <MiniEvent uid='sample' displayUser={false} currentUser={currentUser} navLink="" />
        <MiniEvent uid='sample' displayUser={false} currentUser={currentUser} navLink="" />
        <MiniEvent uid='sample' displayUser={false} currentUser={currentUser} navLink="" />
        <MiniEvent uid='sample' displayUser={false} currentUser={currentUser} navLink="" />
      </ScrollView>
    </View>
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