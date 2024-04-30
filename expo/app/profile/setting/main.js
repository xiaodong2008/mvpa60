import { ScrollView, Text, View } from "react-native";
import { useContext } from "react";

import { SessionContext } from "../../_layout";

import Topbar from "../../../components/topbar";
import Select from "../../../components/select";
import Blank from "../../../components/blank";
import Banner from "../../../components/banner";
import theme from "../../../theme";

import Background from "../../../components/background";

export default function Setting({ navigation }) {
  const session = useContext(SessionContext);

  return (
    <View style={styles.container}>
      <Background />
      <Topbar title="Profile" leftIcon="back" leftPress={navigation.goBack} />
      <ScrollView>
        <Text style={styles.title}>Preferences</Text>
        <Select text="Language" value="English" first={true} />
        <Select text="Fitness Goal" value="Lose Weight" />
        <Select text="Goals per Day" value="1 hour" />
        <Text style={styles.title}>Account Setting</Text>
        <Select
          text="Change Nickname"
          value={session?.profile.nickname}
          first={true}
          onPress={() => navigation.navigate("Settings/ChangeNickname")}
        />
        <Select text="Change Email" value={session?.user.email} />
        <Select
          text="Change Password"
          value="********"
          onPress={() => navigation.navigate("Settings/ChangePassword")}
        />
        <Text style={{ ...styles.danger.title }}>Danger Zone</Text>
        <Select
          text="Logout"
          danger={true}
          onPress={() => navigation.navigate("Settings/Logout")}
        />
        <Select
          text="Delete Account"
          danger={true}
          last={true}
          onPress={() => navigation.navigate("Settings/DeleteAccount")}
        />
        <Blank height={100} />
      </ScrollView>
      <Banner active="profile" />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    // backgroundColor: "white",
  },
  title: {
    backgroundColor: theme.color.background,
    fontSize: 14,
    padding: 8,
    paddingLeft: 12,
    color: "#737373",
  },
  danger: {
    title: {
      backgroundColor: "rgba(255,127,127,0.45)",
      fontSize: 14,
      padding: 8,
      paddingLeft: 12,
      color: "#ff0000",
      borderColor: "#ff0000",
      borderWidth: 1,
    },
  },
};
