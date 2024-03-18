import {View} from "react-native";

import Banner from "../../components/banner";

import Profile from "./main";
import Setting from "./setting/main";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Nickname from "./setting/nickname";
import Password from "./setting/password";
import Logout from "./setting/logout";
import Delete from "./setting/delete";
const Stack = createNativeStackNavigator();

export default function Page() {
    return (
        <View style={{flex: 1}}>
            <Stack.Navigator initialRouteName="Profile" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Settings" component={Setting} />
                <Stack.Screen name="Settings/ChangeNickname" component={Nickname} />
                <Stack.Screen name="Settings/ChangePassword" component={Password} />
                <Stack.Screen name="Settings/Logout" component={Logout} />
                <Stack.Screen name="Settings/DeleteAccount" component={Delete} />
            </Stack.Navigator>
            <Banner active="profile" />
        </View>
    )
}
