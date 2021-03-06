import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

import { Text, View } from './Themed';
import { MonoText } from './StyledText';
import MiniProfile from './MiniProfile';
import { SampleEvents } from '../assets/SampleEvents';

export default function EventScreen({ uid, createdUser, currentUser }: { uid: string, createdUser:string, currentUser: boolean }) {
    const [joined, setJoined] = useState<boolean>(false);

    const onPress = () => {
        setJoined(!joined);
        console.log(joined);
    };

    const slots=['👩🏻‍🍳', '🚴‍♂️', '🤓', '', '']

    const userData = SampleEvents;
    let sampleEvent;
    if(uid=='sample1') {
      sampleEvent = userData.sampleEvent1;
    } else if (uid == 'sample2') {
      sampleEvent = userData.sampleEvent2;
    } else if (uid == 'sample3') {
      sampleEvent = userData.sampleEvent3;
    } else {
      sampleEvent = userData.sampleEvent4;
    }
    // const imgGetter = await getImg(sampleEvent.image).then((url) => {setImageState(url); console.log(url);}).catch(() => {setImageState(null)});

    return (
        <View style={styles.container}>
            <View style={styles.stickyProfile}>
                <MiniProfile uid={createdUser} touchable={false} navLink={""} />
            </View>
            <ScrollView contentContainerStyle={styles.scroll}>
                <MonoText style={styles.title}>{sampleEvent.title}</MonoText>
                <MonoText style={styles.descriptionText}>{sampleEvent.description}</MonoText>
                {currentUser &&
                    <TouchableOpacity style={styles.button} onPress={onPress}>
                        <MonoText style={styles.buttonText}>Delete Event!</MonoText>
                    </TouchableOpacity>
                }
                {!currentUser &&
                    (joined ?
                        <TouchableOpacity style={styles.button} onPress={onPress}>
                            <MonoText style={styles.buttonText}>Leave Event!</MonoText>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.button} onPress={onPress}>
                            <MonoText style={styles.buttonText}>Join Event!</MonoText>
                        </TouchableOpacity>
                    )
                }
                <MonoText style={styles.openingsText}>Openings:</MonoText>
                <MiniProfile uid='user1' touchable={false} navLink={""} />
                <MiniProfile uid='user2' touchable={false} navLink={""} />
                <MiniProfile uid='user3' touchable={false} navLink={""} />
                <MiniProfile uid='empty' touchable={false} navLink={""} />
                <MiniProfile uid='empty' touchable={false} navLink={""} />
                <View style={{height: 300, width: '100%', backgroundColor: 'white'}}>
                    <Image style={{width: '100%', height: 300}} resizeMode={'cover'} source={{uri: sampleEvent.image}} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "lightblue",
        height: 60,
        width: "50%",
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
    image: {
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
