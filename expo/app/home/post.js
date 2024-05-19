import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Background from "../../components/background";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { SessionContext } from "../_layout";
import Topbar from "../../components/topbar";
import database from "../../database";
import message from "../../message";
import theme from "../../theme";

export default function Post({ navigation }) {
  const session = React.useContext(SessionContext);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isPrivate, setIsPrivate] = React.useState(false);

  const submit = async () => {
    if (!title || !description) {
      message.error("Please fill in all fields");
      return;
    }

    const { error } = await database.from("post").insert({
      data: {
        title,
        description,
      },
      private: isPrivate,
      user_id: session.user.id,
    });

    if (error) {
      message.error("Failed to publish post");
      console.error(error);
      return;
    }

    message.success("Post published successfully");
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.view}>
        <Background />
        <Topbar
          title="Post"
          leftIcon="back"
          leftPress={navigation.goBack}
          rightIcon={
            <Pressable style={styles.topbar.container} onPress={submit}>
              <Text style={{ ...styles.topbar.text }}>Post</Text>
              <FontAwesome5 name="paper-plane" size={20} color="#41C9E2" />
            </Pressable>
          }
        />
        <View style={styles.form.container}>
          <TextInput
            style={styles.form.title}
            value={title}
            onChangeText={setTitle}
            placeholder="Post Title"
          />
          <ScrollView style={{ height: 200 }}>
            <TextInput
              style={styles.form.description}
              placeholder="Post Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </ScrollView>
          <View style={styles.form.options}>
            <Text>Private</Text>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isPrivate ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
          <Text style={styles.form.info}>
            This post will publish immediately
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    height: "100%",
  },
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
  form: {
    container: {
      display: "flex",
      margin: 10,
      padding: 20,
      backgroundColor: "transparent",
      borderRadius: 10,
      elevation: 5,
      height: "75%",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    description: {
      fontSize: 16,
      marginVertical: 10,
      minHeight: 240,
    },
    info: {
      position: "absolute",
      bottom: -30,
      left: 0,
      right: 0,
      margin: "auto",
      textAlign: "center",
      color: theme.color.gray,
    },
    options: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 10,
    },
  },
});
