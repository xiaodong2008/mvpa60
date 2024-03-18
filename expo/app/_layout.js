import {Slot} from 'expo-router';
import React, {useEffect} from 'react';
import db from '../database';
import {SafeAreaView, StyleSheet} from "react-native";

import FlashMessage from "react-native-flash-message";
import message from "../message";

export const SessionContext = React.createContext();

export default function HomeLayout() {
    const [session, setSession] = React.useState(undefined)
    const [profile, setProfile] = React.useState(undefined)

    useEffect(() => {
        db.auth.getSession().then(({data: {session}}) => {
            if (session) {
                setSession(session)
            }
        })

        db.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') setSession(null), setProfile(null)
            else setSession(session)
        })
    }, []);

    useEffect(() => {
        if (session) getProfile().then(r => setProfile(r))
    }, [session])

    return (
        <SessionContext.Provider
            value={{
                user: session?.user,
                profile: profile,
                updateProfile: () => getProfile().then(r => setProfile(r))
            }}>
            <FlashMessage position="top"/>
            <SafeAreaView style={styles.container}>
                <Slot name="main"/>
            </SafeAreaView>
        </SessionContext.Provider>
    );

    async function getProfile() {
        if (!session?.user) return;
        const {data, error} = await db.from('userdata').select('*').eq('user_id', session.user.id).single()
        if (error) return message.error(error.message)

        // Setup user data
        if (!data) {
            const {data, error} = await db.from("userdata").insert({nickname: email.split("@")[0], data: {}})
            if (error) return message.error(error.message)
            return data;
        }
        return data;
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
    },
});