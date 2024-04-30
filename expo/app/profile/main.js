import { Text, View, StyleSheet } from "react-native";
import { SessionContext } from "../_layout";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../theme";

import Topbar from "../../components/topbar";
import Banner from "../../components/banner";
import Avatar from "./avatar";
import Statistic from "./statistic";

import Background from "../../components/background";

export default function Profile({ navigation }) {
  const session = useContext(SessionContext);

  return (
    <View style={theme.styles.pageRoot}>
      <Background />
      <Topbar
        title="Profile"
        rightIcon={
          <Ionicons
            name="settings-sharp"
            size={20}
            color={theme.color.primary}
          />
        }
        rightPress={() => navigation.navigate("Settings")}
      />
      <View style={styles.container}>
        <Avatar />
        <Text style={styles.name}>
          {session.profile?.nickname || "Anonymous"}
        </Text>
        <Statistic />
      </View>
      <Banner active="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
});
