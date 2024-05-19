import React from "react";
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Platform,
} from "react-native";

import UploadImage from "./uploadImage";

import Topbar from "../../components/topbar";
import Banner from "../../components/banner";
import theme from "../../theme";
import Background from "../../components/background";
import Button from "../../components/button";

import { SelectList } from "react-native-dropdown-select-list";
import Input from "../../components/input";
import message from "../../message";

export default function RecordPage({ navigation }) {
  const [uploadImages, setUploadImages] = React.useState([]);
  const [type, setType] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const types = [
    "Outdoor Run",
    "Outdoor Walk",
    "Indoor Run",
    "Indoor Walk",
    "Outdoor Cycle",
    "Indoor Cycle",
    "Pool Swim",
    "Open Water Swim",
    "Multi-Sport",
    "Hiking",
    "Elliptical",
    "Stair Stepper",
    "Rowing Machine",
    "High-Intensity Interval Training",
    "Kickboxing",
    "Functional Strength Training",
    "Core Training",
    "Yoga",
    "Pilates",
    "Tai Chi",
    "Cooldown",
  ];

  return (
    <KeyboardAvoidingView
      style={theme.styles.pageRoot}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Topbar title="Record" />
      <ScrollView style={[theme.styles.pageContent, styles.container]}>
        <Text style={styles.title}>Record your workout</Text>
        <Text style={styles.text}>
          Upload images, and add some information to record your workout.
        </Text>
        <Text style={styles.subtitle}>Upload Images</Text>
        {uploadImages.map((image, i) => (
          <Image
            resizeMode="contain"
            key={i}
            source={{ uri: image }}
            style={styles.image}
          />
        ))}
        <UploadImage callback={(image) => upload(image, setUploadImages)} />
        <Text style={styles.subtitle}>Type of workout</Text>
        <SelectList setSelected={setType} data={types} />
        <Text style={styles.subtitle}>Duration(min)</Text>
        <Input text="Duration" />
        <Text style={styles.subtitle}>Notes</Text>
        <TextInput
          style={theme.styles.input}
          // multiline={true}
          placeholder="Add some notes"
        />
        <Button
          top={20}
          bottom={80}
          text="Record Workout"
          loading={loading}
          onPress={() => submit(setLoading, navigation)}
        />
      </ScrollView>
      <Banner active="workout" />
      <Background />
    </KeyboardAvoidingView>
  );
}

function submit(set, navigate) {
  set(true);
  setTimeout(() => {
    set(false);
    message.success("Workout recorded");
    navigate.goBack();
  }, 2000);
}

function upload(image, set) {
  console.log("Uploading", image);
  set((prev) => [...prev, image]);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 20,
    display: "flex",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    marginBottom: 20,
  },
  image: {
    height: 220,
    borderWidth: 2,
    borderColor: theme.color.primary,
    borderRadius: 10,
    marginBottom: 20,
  },
});
