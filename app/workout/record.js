import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Background from "../../components/background";
import Banner from "../../components/banner";
import Button from "../../components/button";
import React from "react";
import Topbar from "../../components/topbar";
import { date } from "jsfast";
import theme from "../../theme";

let endAt = null;
let updateInterval = null;

export default function RecordPage({ navigation }) {
  const [status, setStatus] = React.useState(0);
  const [timer, setTimer] = React.useState("00:00:00");
  const [lastStop, setLastStop] = React.useState(null);
  const [totalTime, setTotalTime] = React.useState(0);

  return (
    <View style={theme.styles.pageRoot}>
      <Topbar title="Record" />
      <View style={[theme.styles.pageContent, styles.container]}>
        <Text style={styles.title}>Record your workout</Text>
        <View style={styles.info.container}>
          <View style={styles.info.itemContainer}>
            <Text style={styles.info.title}>Time</Text>
            <Text style={styles.info.text}>{timer}</Text>
          </View>
        </View>
        <Button
          top={20}
          text={
            status == 2
              ? "Stop Record"
              : status == 1
                ? "Resume Record"
                : "Start Record"
          }
          color={status == 2 ? "red" : "#99ee00"}
          onPress={() => updateStatus(status, setStatus)}
        />
        {status === 1 ? (
          <Button
            top={20}
            bottom={80}
            text="Finish Record"
            color="#ffcc00"
            onPress={() => uploadStatus()}
          />
        ) : null}
      </View>
      <Banner active="workout" />
      <Background />
    </View>
  );

  function updateStatus(status, setStatus) {
    if (status === 0) startAt = Date.now();
    status = !status || status === 1 ? 2 : 1;
    setStatus(status);
    if (status === 2) {
      setLastStop(Date.now());
      const _lastStop = Date.now();
      updateInterval = setInterval(() => {
        let time = Date.now() - _lastStop + totalTime;
        setTimer(date.string("h:m:s", time + 16 * 60 * 60 * 1000));
      }, 1000);
    } else {
      endAt = Date.now();
      clearInterval(updateInterval);
      setTotalTime(totalTime + Date.now() - lastStop);
    }
  }

  function uploadStatus() {
    navigation.navigate({
      name: "Workout/Upload",
      params: { time: timer, start: startAt, end: endAt },
    });
  }
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
  info: StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    itemContainer: {
      display: "flex",
      flexDirection: "column",
      // gap: 4,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      textAlign: "center",
    },
    text: {
      fontSize: 60,
      textAlign: "center",
    },
  }),
});
