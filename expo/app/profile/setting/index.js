import {StyleSheet, View} from "react-native";

import Banner from "../../../components/banner";

import Setting from "./main";
import Delete from "./delete";
import Password from "./password";
import Nickname from "./nickname";
import Logout from "./logout"

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function Page({navigation}) {
    return (
        <View style={styles.container}>
            {/*<Stack.Navigator initialRouteName="Setting" screenOptions={{headerShown: false}}>*/}
                {/*<Stack.Screen name="Setting" component={Setting} options={{profileNavigation: navigation}} />*/}
                <Stack.Screen name="Setting">
                    {props => <Setting {...props} profileNavigation={navigation} />}
                </Stack.Screen>
            {/*</Stack.Navigator>*/}
            <Banner active="profile" />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});