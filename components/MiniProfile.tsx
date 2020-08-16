import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { useNavigation } from '@react-navigation/native';
import {SampleUsers} from '../assets/SampleUsers';

/**
 * A MiniProfile.
 * @param {string, boolean} param0 The Uid of the profile and a boolean for whether the
 * MiniProfile should be clickable.
 */
export default function MiniProfile({ uid, touchable = true, navLink }: { uid: string, touchable: boolean, navLink: string }) {

  const nav = useNavigation();

  const userData = SampleUsers;
  let sampleUser;
  if(uid=='user1') {
    sampleUser = userData.user1;
  } else if (uid == 'user2') {
    sampleUser = userData.user2;
  } else if (uid == 'user3') {
    sampleUser = userData.user3;
  } else if (uid == 'user4') {
    sampleUser = userData.user4;
  } else {
    sampleUser = userData.empty;
  }

  const goToFullProfile = () => {
    nav.navigate(navLink);
  }

  if (touchable) {
    return (
      <TouchableOpacity style={[styles.container, {borderColor: 'black'}]} onPress={goToFullProfile}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{sampleUser.icon}</Text>
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>@ <MonoText style={styles.username}>{sampleUser.username}</MonoText></Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{sampleUser.icon}</Text>
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>@ <MonoText style={styles.username}>{sampleUser.username}</MonoText></Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    borderWidth: 2,
    borderColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    margin: 2,
  },
  emoji: {
    fontSize: 28,
  },
  emojiContainer: {
    padding: 5,
    margin: 5,
    marginRight: 15,
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 2,
    borderRadius: 500,
  },
  username: {
    fontSize: 24,
    color: 'black',
  },
  usernameContainer: {
    backgroundColor: 'white',
  },
})