import * as ImagePicker from "expo-image-picker";

import { Image, Pressable, StyleSheet, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Buffer } from "buffer";
import axios from "axios";
import theme from "../../theme";

export default function UploadImage({ callback }) {
  return (
    <Pressable onPress={() => pickImage(callback)}>
      <View style={styles.container}>
        <AntDesign name="plus" size={24} color="black" />
      </View>
    </Pressable>
  );
}

async function pickImage(callback) {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    alert("Sorry, we need camera roll permissions to make this work!");
    return;
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    base64: true,
  });

  if (!result.canceled) {
    console.log("Image picked");
    callback([result.assets[0].uri, result.assets[0].base64]);
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: theme.color.primary,
    backgroundColor: theme.color.whiteGray,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    display: "grid",
    alignItems: "center",
  },
});
