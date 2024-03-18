import Main from "./main";
import Post from "./post";
import Banner from "../../components/banner";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useContext, useEffect} from "react";
import {SessionContext} from "../_layout";
import user from "../../user";
import {View} from "react-native";
import theme from "../../theme";
const Stack = createNativeStackNavigator();

export default function Page({navigation}) {
    const session = useContext(SessionContext)

    useEffect(() => {
        if (session.user === null) navigation.navigate('Login')
    }, [session])


    return (
        <View style={theme.styles.pageRoot}>
            {
                session.user && (
                    <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                        <Stack.Screen name="Home" component={Main}/>
                        <Stack.Screen name="Post" component={Post}/>
                    </Stack.Navigator>
                )
            }
            <Banner active="home"/>
        </View>
    )
}