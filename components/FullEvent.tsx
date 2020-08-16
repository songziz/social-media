import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { Text, View } from './Themed';
import { MonoText } from './StyledText';
import MiniProfile from './MiniProfile';

export default function EventScreen({ uid, currentUser }: { uid: string, currentUser: boolean }) {
    const [joined, setJoined] = useState<boolean>(false);

    const onPress = () => {
        setJoined(!joined);
        console.log(joined);
    };

    return (
        <View style={styles.container}>
            <View style={styles.stickyProfile}>
                <MiniProfile uid={uid} touchable={false} navLink={""} />
            </View>
            <ScrollView contentContainerStyle={styles.scroll}>
                <MonoText style={styles.title}>Event Title</MonoText>
                <MonoText style={styles.descriptionText}>Event Description:</MonoText>
                {joined &&
                    <TouchableOpacity style={styles.button} onPress={onPress}>
                        <MonoText style={styles.buttonText}>Leave Event!</MonoText>
                    </TouchableOpacity>}
                {!joined &&
                    <TouchableOpacity style={styles.button} onPress={onPress}>
                        <MonoText style={styles.buttonText}>Join Event!</MonoText>
                    </TouchableOpacity>}

                <MonoText style={styles.openingsText}>Openings:</MonoText>
                <MiniProfile uid='sample' touchable={false} navLink={""} />
                <MiniProfile uid='sample' touchable={false} navLink={""} />
                <MiniProfile uid='sample' touchable={false} navLink={""} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "lightblue",
        height: "15%",
        width: "100%",
        padding: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "black",
        fontSize: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    descriptionText: {
        fontSize: 15,
        alignSelf: "flex-start",
        paddingBottom: 10,
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
        paddingTop: 25,
    },
    scroll: {
        width: '100%',
        alignItems: 'center',
        justifyContent: "center",
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
    userInfo: {
        flex: 0.2,
        justifyContent: "flex-end",
        paddingBottom: 20,
        width: "100%",
    }
});
