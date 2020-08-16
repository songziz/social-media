import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from './Themed';
import { MonoText } from './StyledText';
import MiniProfile from './MiniProfile';

export default function EventScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.eventInfo}>
                <MonoText style={styles.title}>Event Title</MonoText>
                <MonoText style={styles.descriptionText}>Event Description:</MonoText>
                <TouchableOpacity style={styles.button}><MonoText style={styles.buttonText}>Join Event!</MonoText></TouchableOpacity>
                <MonoText style={styles.openingsText}>Openings:</MonoText>
                <MiniProfile uid='sample' touchable={false} />
                <MiniProfile uid='sample' touchable={false} />
                <MiniProfile uid='sample' touchable={false} />
            </View>
            <View style={styles.userInfo}>
                <MonoText style={styles.postText}>Posted by:</MonoText>
                <MiniProfile uid='sample' touchable={false} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "white",
        height: "10%",
        width: "100%",
        padding: 10,
    },
    buttonText: {
        color: "black",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    descriptionText: {
        fontSize: 15,
        alignSelf: "flex-start",
    },
    eventInfo: {
        flex: 0.8,
        alignItems: "center",
    },
    openingsText: {
        fontSize: 15,
        alignSelf: "flex-start",
    },
    postText: {
        fontSize: 20,
    },
    title: {
        padding: 10,
        fontSize: 30,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    userInfo: {
        flex: 0.2,
        justifyContent: "flex-end",
        paddingBottom: 20,
        width: "100%",

    }
});
