import { View } from "react-native";
import theme from "../theme";

import Login from "./login";
import Main from "./home/index";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export default function Page() {
  return (
    <View style={theme.styles.pageRoot}>
      <Stack.Navigator screenOptions={theme.stack}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </View>
  );
}
