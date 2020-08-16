import React from 'react';
import { StyleSheet, TouchableOpacity, Button } from 'react-native';

import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import MiniProfile from './MiniProfile';

import { useNavigation } from "@react-navigation/native";

/**
 * A MiniEvent.
 * @param {string, boolean} param0 event id and a boolean for whether to display
 * a MiniProfile at the top of the MiniEvent. Also if currentUser, display option to
 * mark the event as completed.
 */
export default function MiniEvent({ uid, displayUser, currentUser }: { uid: string, displayUser: boolean, currentUser: boolean }) {
  const nav = useNavigation();

  const sampleEvent = {
    title: 'Fun event!',
    openings: 5,
    slots: ['🔥', '🔥', '🔥', '', '',]
  };

  const onPress = () => {
    nav.navigate('FullEvent');
    console.log('navigate to full event page');
  }

  const OpeningsSlots = sampleEvent.slots.map((slot, index) => {
    return (
      <View key={index} style={styles.openingsSlot}>
        <Text>{slot}</Text>
      </View>
    );
  });

  const markComplete = () => {
    console.log('Marked complete.');
  };

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
        {currentUser && <View style={styles.separator} />}
        {currentUser && 
          <TouchableOpacity 
            onPress={markComplete}
            style={styles.completeContainer}
          >
            <Text style={styles.completeText}>Mark as Complete</Text>
          </TouchableOpacity>
        }
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
        {currentUser && <View style={styles.separator} />}
        {currentUser && 
          <TouchableOpacity 
            onPress={markComplete}
            style={styles.completeContainer}
          >
            <Text style={styles.completeText}>mark as complete</Text>
          </TouchableOpacity>
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  completeContainer: {
    alignSelf: 'center',
    backgroundColor: 'orange',
    marginBottom: 8,
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  completeText: {
    color: 'black',
    fontSize: 16,
  },
  container: {
    width: '95%',
    borderWidth: 4,
    borderColor: 'green',
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: 3,
    margin: 4,
    padding: 2,
  },
  openingsContainer: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    flexWrap: 'wrap',
    marginLeft: 8,
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
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'green',
  },
  title: {
    fontSize: 24,
    color: 'black',
    alignSelf: 'center',
  },
  titleContainer: {
    backgroundColor: 'white',
    // borderWidth: 1,
    // borderColor: 'red',
  },
})