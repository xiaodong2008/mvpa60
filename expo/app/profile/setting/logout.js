import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import message from "../../../message";
import { SessionContext } from "../../_layout";
import db from "../../../database";

import Topbar from "../../../components/topbar";
import { router } from "expo-router";
import Button from "../../../components/button";
import theme from "../../../theme";

export default function Delete({ navigation }) {
  const [loading, setLoading] = useState(false);

  const session = useContext(SessionContext);

  return (
    <View>
      <Topbar title="Logout" />
      <View style={styles.container}>
        <Text style={styles.text}>Are you sure you want to logout?</Text>
        <Text style={styles.text}>
          You need to enter your email and password to login to this account
          again.
        </Text>
        <Button
          color="red"
          text="Logout"
          loading={loading}
          bold={true}
          onPress={deleteAccount}
        />
        <Button
          color={theme.color.gray}
          text="Cancel"
          bold={true}
          top={10}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );

  async function deleteAccount() {
    setLoading(true);
    router.navigate("/");
    await db.auth.signOut();
    message.success("You have been logged out");
    session.clearSession();
    router.navigate("/");
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
});
