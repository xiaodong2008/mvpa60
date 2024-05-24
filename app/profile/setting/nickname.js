import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { useContext, useState } from "react";

import Background from "../../../components/background";
import Button from "../../../components/button";
import Input from "../../../components/input";
import { SessionContext } from "../../_layout";
import Topbar from "../../../components/topbar";
import db from "../../../database";
import message from "../../../message";

export default function Nickname({ navigation }) {
  const [nickname, setNickname] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const session = useContext(SessionContext);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ height: "100%" }}>
        <Background />
        <Topbar
          title="Change Nickname"
          leftIcon="back"
          leftPress={() => navigation.goBack()}
          navigation={navigation}
        />
        <View style={styles.container}>
          <Text style={styles.text}>
            Your Nickname: {session?.profile.nickname}
          </Text>
          <Input text="New Nickname" event={setNickname} />
          <Button text="Submit" onPress={submit} loading={loading} />
          {alert ? <Text style={styles.alert}>{alert}</Text> : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  async function submit() {
    if (!nickname) {
      return setAlert("Nickname is required");
    }
    setAlert("");
    setLoading(true);
    Keyboard.dismiss();
    // get new user data
    const { data } = await db
      .from("userdata")
      .select("*")
      .eq("user_id", session.user.id)
      .single();
    const public_data = data.public_data;
    public_data.nickname = nickname;
    const { error } = await db
      .from("userdata")
      .update({ public_data })
      .eq("user_id", session.user.id);
    if (error) {
      setLoading(false);
      return setAlert(error.message);
    }
    await session.updateProfile();
    message.success("Nickname updated");
    navigation.goBack();
  }
}

const styles = {
  text: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  container: {
    padding: 20,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  alert: {
    color: "red",
    width: 300,
    marginTop: 3,
  },
};
