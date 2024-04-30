import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Background = () => {
  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    >
      <Image style={background} source={require("../assets/background.png")} />
    </View>
  );
};

export default Background;

const background = StyleSheet.create({
  position: "absolute",
  width: "100%",
  height: "100%",
  zIndex: 0,
});
