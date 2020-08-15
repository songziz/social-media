import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { useNavigation } from '@react-navigation/native';

/**
 * A MiniProfile.
 * @param {string, boolean} param0 The Uid of the profile and a boolean for whether the
 * MiniProfile should be clickable.
 */
export default function MiniProfile({ uid, touchable = true }: { uid: string, touchable: boolean }) {

  const nav = useNavigation();

  const sampleUser = {
    username: 'user-name',
    emoji: '🔥',
  };

  const onPress = () => {
    nav.navigate("FriendInfoScreen");
  }

  if (touchable) {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{sampleUser.emoji}</Text>
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
          <Text style={styles.emoji}>{sampleUser.emoji}</Text>
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
    borderWidth: 1,
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