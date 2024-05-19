import {
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import theme from "../theme";

export default function Button(props) {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 38,
      padding: 8,
      marginTop: props.top ? props.top : 0,
      marginBottom: props.bottom ? props.bottom : 0,
      backgroundColor: props.disabled
        ? theme.color.gray
        : props.color
          ? props.color
          : theme.color.primary,
      width: props.width ? props.width : "100%",
      borderRadius: 12,
    },
    button: {
      width: "100%",
      fontWeight: props.bold ? "800" : "600",
      fontSize: 15,
      color: "white",
      textAlign: "center",
    },
  });

  return (
    <Pressable
      onPress={props.disarbled || props.loading ? null : props.onPress}
    >
      <View style={styles.container}>
        {props.loading ? (
          <ActivityIndicator color="white" style={styles.button} />
        ) : (
          <Text style={styles.button}>{props.text}</Text>
        )}
      </View>
    </Pressable>
  );
}
