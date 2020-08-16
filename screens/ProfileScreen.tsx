import * as React from 'react';
import { StyleSheet } from 'react-native';

import FullProfile from '../components/FullProfile';

export default function ProfileScreen({uid}: {uid: string}) {
    return (
        <FullProfile uid='sample' currentUser={true}/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});
