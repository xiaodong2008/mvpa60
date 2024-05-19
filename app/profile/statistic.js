import { Pressable, StyleSheet, Text, View } from "react-native";

import Overview from "./overview";
import React from "react";
import theme from "../../theme";

export default function Statistic() {
  const [scope, setScope] = React.useState(1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Train Smarter with MVPA60</Text>
      <Text style={styles.subtitle}>My Statistics</Text>
      <View style={styles.select.container}>
        <Pressable onPress={() => setScope(1)} style={{ width: "33%" }}>
          <Text
            style={[
              styles.select.text,
              scope === 1 && { color: theme.color.primary },
            ]}
          >
            DAILY
          </Text>
        </Pressable>
        <Pressable onPress={() => setScope(2)} style={{ width: "33%" }}>
          <Text
            style={[
              styles.select.text,
              scope === 2 && { color: theme.color.primary },
            ]}
          >
            WEEKLY
          </Text>
        </Pressable>
        <Pressable onPress={() => setScope(3)} style={{ width: "33%" }}>
          <Text
            style={[
              styles.select.text,
              scope === 3 && { color: theme.color.primary },
            ]}
          >
            MONTHLY
          </Text>
        </Pressable>
        <Text
          style={[
            styles.select.instructBar,
            { left: `${(scope - 1) * 33.333}%` },
          ]}
        />
      </View>
      <Overview scope={scope} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 2,
    marginTop: 20,
  },
  title: {
    backgroundColor: theme.color.primary,
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    padding: 8,
    width: "100%",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "600",
    padding: 6,
    paddingLeft: 10,
    color: "black",
    marginTop: 2,
    backgroundColor: theme.color.background,
  },
  select: {
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: 2,
      backgroundColor: "white",
      borderRadius: 10,
      width: "100%",
      position: "relative",
    },
    text: {
      fontSize: 13,
      fontWeight: "400",
      color: "#A19D9D",
      textAlign: "center",
    },
    instructBar: {
      position: "absolute",
      bottom: 0,
      height: 2,
      backgroundColor: theme.color.primary,
      width: "33.33%",
    },
  },
});
