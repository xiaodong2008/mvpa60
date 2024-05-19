import { StyleSheet, Text, View } from "react-native";

import theme from "../../theme";

export default function AllView(props) {
  const isWeekly = props.scope === 2;
  const keyword = isWeekly ? "week" : "month",
    keywordCap = isWeekly ? "Week" : "Month";

  return (
    <View style={styles.container}>
      <View style={[styles.line.container]}>
        <Text>All Activites</Text>
        <View style={styles.line.right}>
          <Text>This {keywordCap}</Text>
          <Text>Last {keywordCap}</Text>
        </View>
        <View></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    color: theme.color.whiteGray,
  },
  line: StyleSheet.create({
    container: {
      borderRadius: 5,
      flexDirection: "row",
      height: 30,
      margin: 5,
      marginBottom: 0,
      backgroundColor: "white",
      alignItems: "center",
      paddingLeft: 10,
      paddingRight: 10,
    },
    right: {
      flexDirection: "row",
      marginLeft: "auto",
      width: 200,
      justifyContent: "space-around",
    },
  }),
});
