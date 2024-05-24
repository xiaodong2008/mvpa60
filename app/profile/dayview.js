import { StyleSheet, Text, View } from "react-native";

import { FontAwesome6 } from "@expo/vector-icons";
import theme from "../../theme";

export default function DayView() {
  const data = [
    {
      type: "run",
      date: "2024-04-11 10:36:31",
      duration: 3851,
    },
    {
      type: "walk",
      date: "2024-04-09 20:16:39",
      duration: 1583,
    },
    {
      type: "cycle",
      date: "2024-04-09 09:12:40",
      duration: 1040,
    },
    {
      type: "walk",
      date: "2024-04-08 14:42:05",
      duration: 9928,
    },
  ];
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <Row key={index} {...item} />
      ))}
    </View>
  );
}

function Row(props) {
  const iconMap = {
    run: "person-running",
    walk: "person-walking",
    cycle: "bicycle",
  };
  return (
    <View style={styles.row.container}>
      <View style={styles.row.icon}>
        <FontAwesome6
          color={theme.color.primary}
          name={iconMap[props.type]}
          size={20}
        />
      </View>
      <Text width={50} style={styles.row.text}>
        {props.type}
      </Text>
      <Text width={165} style={styles.row.text}>
        {props.date}
      </Text>
      <Text style={styles.row.text}>
        {Math.round(props.duration / 60)} mins
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingBottom: 0,
  },
  row: {
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
      backgroundColor: "white",
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.color.primary,
    },
    icon: {
      width: 30,
      flexDirection: "row",
      justifyContent: "center",
    },
    text: {
      marginLeft: 7,
      fontSize: 15,
    },
  },
});
