import React, {useContext} from 'react'
import {Button, SafeAreaView, StyleSheet, Text} from "react-native";

import Topbar from "../components/topbar";
import Banner from "../components/banner";
import {SessionContext} from "./_layout";

import db from "../database";
import user from "../user";

export default function Profile() {
    const session = useContext(SessionContext);

    return (
        <SafeAreaView style={styles.container}>
            <Topbar title="Profile"/>
            <Text>Login As: {session?.user.email}</Text>
            <Button title={"Logout"} onPress={() => user.logout()}/>
            <Banner active="profile" />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    }
});