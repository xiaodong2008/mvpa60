import {
    StyleSheet,
    Image,
    View,
    Animated,
    Dimensions, SafeAreaView, ScrollView,
    // useWindowDimensions
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import theme from "../theme";

import {SessionContext} from "./_layout";
import Login from './login';
import Banner from '../components/banner';
import Main from "./home/index";
import Post from "./home/post";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function Page() {
    const session = useContext(SessionContext)
    const [show, setShow] = useState(null);
    // const [status, setStatus] = useState(false);

    const loginWindow = new Animated.ValueXY({x: 0, y: Dimensions.get('window').height + 300});

    function setLoginWindow(show) {
        // if (!status) return;
        console.log('setLoginWindow', show)
        // setStatus(show);
        loginWindow.setValue({x: 0, y: show ? Dimensions.get('window').height + 300 : 0});
        Animated.timing(loginWindow, {
            toValue: {x: 0, y: !show ? Dimensions.get('window').height + 300 : 0},
            duration: 1000,
            useNativeDriver: false
        }).start()
    }

    useEffect(() => {
        console.log(session)
        if (session.user === null) setLoginWindow(true);
        else if (show === false && session.profile.nickname) setLoginWindow(false);
    }, [show, session])

    return (
        <View style={theme.styles.pageRoot}>
            <Stack.Navigator screenOptions={theme.stack}>
                <Stack.Screen name="Main" component={Main}/>
                <Stack.Screen name="Login" component={Login}/>
            </Stack.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    login: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1,
    }
});