import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

import Background from "../../components/background";
import Banner from "../../components/banner";
import Button from "../../components/button";
import React from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { SessionContext } from "../_layout";
import Topbar from "../../components/topbar";
import UploadImage from "./uploadImage";
import { date } from "jsfast";
import db from "../../database";
import { decode } from "base64-arraybuffer";
import message from "../../message";
import theme from "../../theme";

export default function RecordPage({ route, navigation }) {
  const session = React.useContext(SessionContext);

  const [uploadImages, setUploadImages] = React.useState([]);
  const [type, setType] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [note, setNote] = React.useState(null);
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
        <Text style={styles.title}>Upload your workout</Text>
        <Text style={styles.text}>
          Upload images, and add some information to record your workout.
        </Text>
        <Text style={styles.subtitle}>Upload Images</Text>
        {uploadImages.map((image, i) => (
          <Image
            resizeMode="contain"
            key={i}
            source={{ uri: image[0] }}
            style={styles.image}
          />
        ))}
        <UploadImage callback={(image) => upload(image, setUploadImages)} />
        <Text style={styles.subtitle}>Type of workout</Text>
        <SelectList setSelected={setType} data={types} />
        <Text style={styles.subtitle}>Info</Text>
        <Text>Start at: {date.string("Y-M-D h:m:s", route.params.start)}</Text>
        <Text>End at: {date.string("Y-M-D h:m:s", route.params.end)}</Text>
        <Text>Time: {route.params.time}</Text>
        <Text style={styles.subtitle}>Notes</Text>
        <TextInput
          style={theme.styles.input}
          value={note}
          onChangeText={(text) => setNote(text)}
          placeholder="Add some notes"
        />
        <Button
          top={20}
          bottom={80}
          text="Save Workout"
          loading={loading}
          onPress={() => submit()}
        />
      </ScrollView>
      <Banner active="workout" />
      <Background />
    </KeyboardAvoidingView>
  );

  async function submit() {
    setLoading(true);
    if (!type) {
      message.error("Please select a type");
      setLoading(false);
      return;
    }
    let key = 0;
    for (let image of uploadImages) {
      const { error } = await db.storage
        .from("workout")
        .upload(
          `/${session.user.id}/${route.params.end}/${key++}`,
          decode(image[1]),
          {
            contentType: "image/*",
          },
        );
      if (error) {
        console.error(error);
        message.error("Failed to save image");
      }
    }
    const { error } = await db.from("record").insert({
      create_at: new Date().toISOString(),
      // start_at: route.params.start,
      start_at: new Date(route.params.start).toISOString(),
      // end_at: route.params.end,
      end_at: new Date(route.params.end).toISOString(),
      info: {
        type: type,
        time: route.params.time,
        note: note,
        images: new Array(uploadImages.length)
          .fill(null)
          .map((_, i) => `${session.user.id}/${route.params.end}/${i}`),
      },
    });
    setLoading(false);
    if (error) {
      console.error(error);
      message.error("Failed to save workout");
    } else {
      message.success("Workout saved");
      navigation.navigate("Workout");
    }
  }
}

function upload(image, set) {
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
