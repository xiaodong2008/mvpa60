import Delete from "./setting/delete";
import Logout from "./setting/logout";
import Nickname from "./setting/nickname";
import Password from "./setting/password";
import Profile from "./main";
import Setting from "./setting/main";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import theme from "../../theme";

const Stack = createNativeStackNavigator();

export default function Page() {
  return (
    <View style={theme.styles.pageRoot}>
      <Stack.Navigator initialRouteName="Profile" screenOptions={theme.stack}>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Setting} />
        <Stack.Screen name="Settings/ChangeNickname" component={Nickname} />
        <Stack.Screen name="Settings/ChangePassword" component={Password} />
        <Stack.Screen name="Settings/Logout" component={Logout} />
        <Stack.Screen name="Settings/DeleteAccount" component={Delete} />
      </Stack.Navigator>
    </View>
  );
}
