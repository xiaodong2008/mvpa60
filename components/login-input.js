import { StyleSheet, TextInput, View } from "react-native";
import theme from "../theme";

export default function Input(props) {
  const styles = StyleSheet.create({
    input: {
      width: props.width ? props.width : "100%",
      height: 48,
      borderWidth: 1,
      borderRadius: 12,
      fontWeight: 800,
      color: props.color ? props.color : "black",
      marginBottom: 20,
      borderColor: theme.color.primary,
      backgroundColor: "white",
      paddingLeft: 16,
    },
  });

  return (
    <TextInput
      style={styles.input}
      secureTextEntry={props.secure}
      placeholder={props.text}
      placeholderTextColor={theme.color.gray}
      autoCapitalize={props.cap ? props.cap : "sentences"}
      onChangeText={props.event}
    />
  );
}
