import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";

import { AntDesign } from '@expo/vector-icons';

export default function Topbar(props) {
  const iconTemplate = {
    back: (
      <View style={templateStyles.back.container}>
        <AntDesign name="swapleft" size={26} color="#41C9E2" />
        <Text style={templateStyles.back.text}>Back</Text>
      </View>
    ),
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.left} onPress={props.leftPress}>
        {Object.keys(iconTemplate).includes(props.leftIcon)
          ? iconTemplate[props.leftIcon]
          : props.leftIcon}
      </Pressable>
      <Text style={styles.title}>{props.title}</Text>
      <Pressable style={styles.right} onPress={props.rightPress}>
        {props.rightIcon}
      </Pressable>
    </SafeAreaView>
  );
}

const templateStyles = {
  back: {
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
    },
    text: {
      fontSize: 16,
      fontWeight: "600",
      color: "#41C9E2",
    },
  },
};

const styles = StyleSheet.create({
  container: {
    height: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginTop: 60,
    zIndex: 99,
  },
  title: {
    display: "flex",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  left: {
    position: "absolute",
    left: 0,
    display: "flex",
    flexDirection: "row",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
    marginLeft: 10,
    zIndex: 99,
  },
  right: {
    position: "absolute",
    right: 0,
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
    marginRight: 10,
    zIndex: 99,
  },
});
