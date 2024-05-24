import { useContext, useEffect } from "react";

import Main from "./main";
import Post from "./post";
import { SessionContext } from "../_layout";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import theme from "../../theme";

const Stack = createNativeStackNavigator();

export default function Page({ navigation }) {
  const session = useContext(SessionContext);

  useEffect(() => {
    if (session.user === null) navigation.navigate("Login");
  }, [session]);

  return (
    <View style={theme.styles.pageRoot}>
      <Stack.Navigator initialRouteName="Home" screenOptions={theme.stack}>
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen name="Post" component={Post} />
      </Stack.Navigator>
    </View>
  );
}
