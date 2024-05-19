import { View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Workout from "./main";
import Record from "./record";

import Banner from "../../components/banner";
import theme from "../../theme";

export default function Page() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Workout" screenOptions={theme.stack}>
        <Stack.Screen name="Workout" component={Workout} />
        <Stack.Screen name="Workout/Record" component={Record} />
      </Stack.Navigator>
    </View>
  );
}
