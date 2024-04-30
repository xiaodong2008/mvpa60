import {
  TextInput,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

import Topbar from "../../components/topbar";
import { FontAwesome5 } from "@expo/vector-icons";
import theme from "../../theme";

import Background from "../../components/background";

export default function Post({ navigation }) {
  return (
    <View style={styles.view}>
      <Background />
      <Topbar
        title="Post"
        leftIcon="back"
        leftPress={navigation.goBack}
        rightIcon={
          <View style={styles.topbar.container}>
            <Text style={{ ...styles.topbar.text }}>Post</Text>
            <FontAwesome5 name="paper-plane" size={20} color="#41C9E2" />
          </View>
        }
      />
      <View style={styles.form.container}>
        <TextInput style={styles.form.title} placeholder="Post Title" />
        <ScrollView style={{ height: 200 }}>
          <TextInput
            style={styles.form.description}
            placeholder="Post Description"
            multiline
          />
        </ScrollView>
        <Text style={styles.form.info}>This post will publish immediately</Text>
      </View>
    </View>
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
  },
});
