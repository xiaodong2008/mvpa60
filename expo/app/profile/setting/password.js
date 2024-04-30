import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { useState } from "react";

import Topbar from "../../../components/topbar";
import Button from "../../../components/button";
import Input from "../../../components/input";

import Background from "../../../components/background";

import db from "../../../database";

import { showMessage } from "react-native-flash-message";

export default function Password({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ height: "100%" }}>
        <Background />
        <Topbar
          title="Change Password"
          leftIcon="back"
          leftPress={() => navigation.goBack()}
          navigation={navigation}
        />
        <View style={styles.container}>
          <Input text="New Password" event={setPassword} secure={true} />
          <Input
            text="Confirm Password"
            event={setConfirmPassword}
            secure={true}
          />
          <Button text="Submit" onPress={submit} loading={loading} />
          {alert ? <Text style={styles.alert}>{alert}</Text> : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );

  async function submit() {
    if (!password || !confirmPassword) {
      return setAlert("Please fill in all fields");
    }
    if (password !== confirmPassword) {
      return setAlert("Passwords do not match");
    }
    setAlert("");
    Keyboard.dismiss();
    setLoading(true);
    const { data, error } = await db.auth.updateUser({ password });
    if (error) {
      setLoading(false);
      return setAlert(error.message);
    }
    console.log(data, error);
    showMessage({
      message: "Password Updated",
      type: "success",
      duration: 3000,
      icon: "success",
    });
    navigation.goBack();
  }
}

const styles = {
  topbar: {
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    text: {
      fontSize: 16,
      fontWeight: "600",
      color: "#41C9E2",
    },
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
