import React, {useContext} from 'react'
import {StyleSheet, Text, View} from "react-native";

import Banner from "../../components/banner";
import {SessionContext} from "../_layout";

import theme from "../../theme";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from "./main";
import Delete from "./delete";
import Password from "./password";
import Nickname from "./nickname";
import Logout from "./logout";
const Stack = createNativeStackNavigator();

export default function index() {
    return (
        <View style={styles.container}>
            <Stack.Navigator initialRouteName="Profile" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="ChangeNickname" component={Nickname} />
                <Stack.Screen name="ChangePassword" component={Password} />
                <Stack.Screen name="Logout" component={Logout} />
                <Stack.Screen name="DeleteAccount" component={Delete} />
            </Stack.Navigator>
            <Banner active="profile" />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});