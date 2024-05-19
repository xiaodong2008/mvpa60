import { StyleSheet, View } from "react-native";

import AllView from "./allview";
import DayView from "./dayview";

export default function Overview(props) {
  return (
    <View style={styles.container}>
      <View style={styles.filter.container}>
        {props.scope === 1 ? <DayView /> : <AllView scope={props.scope} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 5,
  },
  filter: {
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
  },
});
