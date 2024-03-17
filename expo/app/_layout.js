import {Slot} from 'expo-router';
import React, {useEffect} from 'react';
import db from '../database';
import {SafeAreaView, StyleSheet} from "react-native";

export const SessionContext = React.createContext();

export default function HomeLayout() {
    const [session, setSession] = React.useState(undefined)

    useEffect(() => {
        const sub = db.auth.onAuthStateChange((event, session) => {
            setSession(session)
            console.log("set", session)
        })

        return () => {
            sub.data.subscription.unsubscribe()
        }
    }, []);

    return (
        <SessionContext.Provider value={session}>
            <SafeAreaView style={styles.container}>
                <Slot/>
            </SafeAreaView>
        </SessionContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
    },
});