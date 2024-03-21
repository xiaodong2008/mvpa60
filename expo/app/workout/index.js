import {View, Text, StyleSheet} from "react-native";
import theme from "../../theme";

import Topbar from "../../components/topbar";
import Banner from "../../components/banner";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function Page() {
  return (
    <View style={theme.styles.pageRoot}>
      <Topbar title="Workout"/>
      
      <Banner active="workout"/>
    </View>
  )
}

const styles = StyleSheet.create({

})