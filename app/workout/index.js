import Banner from "../../components/banner";
import Record from "./record";
import Upload from "./upload";
import { View } from "react-native";
import Workout from "./main";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import theme from "../../theme";

const Stack = createNativeStackNavigator();

export default function Page() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Workout" screenOptions={theme.stack}>
        <Stack.Screen name="Workout" component={Workout} />
        <Stack.Screen name="Workout/Record" component={Record} />
        <Stack.Screen name="Workout/Upload" component={Upload} />
      </Stack.Navigator>
    </View>
  );
}
