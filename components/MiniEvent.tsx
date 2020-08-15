import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { MonoText } from './StyledText';
import { Text, View } from './Themed';
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
    slots: ['🔥', '🔥', '🔥', '', '',]
  };

  const onPress = () => {
    nav.navigate("EventScreen");
  }

  const OpeningsSlots = sampleEvent.slots.map((slot, index) => {
    return (
      <View key={index} style={styles.openingsSlot}>
        <Text>{slot}</Text>
      </View>
    );
  });

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
          <MonoText style={styles.openingsText}>openings:</MonoText>
          <View style={styles.openingsSlotContainer}>
            {OpeningsSlots}
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.titleContainer}>
          <MonoText style={styles.title}>{sampleEvent.title}</MonoText>
        </View>
        <View style={styles.separator} />
        <View style={styles.openingsContainer}>
          <MonoText style={styles.openingsText}>openings:</MonoText>
          <View style={styles.openingsSlotContainer}>
            {OpeningsSlots}
          </View>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    flexWrap: 'wrap',
  },
  openingsText: {
    fontSize: 16,
    color: 'black',
  },
  openingsSlot: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 20,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  openingsSlotContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    flexWrap: 'wrap',
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