import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { MonoText } from './StyledText';
import { View } from './Themed';
import MiniProfile from './MiniProfile';

import { useNavigation } from "@react-navigation/native";

/**
 * A MiniEvent.
 * @param {string, boolean} param0 event id and a boolean for whether to display
 * a MiniProfile at the top of the MiniEvent.
 */
export default function MiniEvent({ uid, displayUser = true }: { uid: string, displayUser: boolean }) {
  const nav = useNavigation();

  const sampleEvent = {
    title: 'Fun event!',
    openings: 5,
    slots: ['🔥', '🔥', '🔥', '', '']
  };

  const onPress = () => {
    nav.navigate("EventScreen");
  }

  if (displayUser) {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <MiniProfile uid='sample' touchable={false} />
        <View style={styles.separator} />
        <View style={styles.titleContainer}>
          <MonoText style={styles.title}>{sampleEvent.title}</MonoText>
        </View>
        <View style={styles.separator} />
        <View style={styles.openingsContainer}>
          <MonoText style={styles.openingsText}>openings: </MonoText>
          {sampleEvent.slots.map(slot => {

          })}
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.titleContainer}>
          <MonoText style={styles.title}>{sampleEvent.title}</MonoText>
        </View>
        <View style={styles.separator} />
        <View style={styles.openingsContainer}>
          <MonoText style={styles.openingsText}>openings: </MonoText>
          {sampleEvent.slots.map(slot => {

          })}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    borderWidth: 1,
    borderColor: 'white',
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: 3,
    margin: 2,
    padding: 2,
  },
  openingsContainer: {
    backgroundColor: 'white',
  },
  openingsText: {
    fontSize: 16,
    color: 'black',
  },
  separator: {
    height: 2,
    width: '100%',
    backgroundColor: 'blue',
  },
  title: {
    fontSize: 24,
    color: 'black',
  },
  titleContainer: {
    backgroundColor: 'white',
    // borderWidth: 1,
    // borderColor: 'red',
  },
})