import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import theme from "../../theme";

import Topbar from "../../components/topbar";
import Banner from "../../components/banner";

export default function Page() {
  return (
    <View style={theme.styles.pageRoot}>
      <Topbar title="Workout" />
      <View style={styles.container}>
        <Text style={styles.title}>Workout</Text>
        <View style={styles.flexBox}>
          <Text style={styles.flexBox.text}>Your progress:</Text>
          <Text style={styles.flexBox.redText}>263</Text>
          <Text style={styles.flexBox.text}>mins/week</Text>
          <Text style={styles.flexBox.redText}>52</Text>
          <Text style={styles.flexBox.text}>mins/day</Text>
          <Text style={styles.flexBox.redText}>8</Text>
          <Text style={styles.flexBox.text}>weeks</Text>
        </View>
        <View style={styles.flexBox}>
          <Text style={[styles.flexBox.block, styles.flexBox.active]}>All</Text>
          <Text style={styles.flexBox.block}>Endurance</Text>
          <Text style={styles.flexBox.block}>Strength</Text>
          <Text style={styles.flexBox.block}>Balance</Text>
          <Text style={styles.flexBox.block}>Flexibility</Text>
        </View>
        <ScrollView>
          <View style={styles.block.container}>
            <Image
              source={require("../../assets/endurance-training.png")}
              style={styles.block.image}
            />
            <Text style={styles.block.title}>Endurance Training</Text>
            <Text style={styles.block.text}>
              Endurance exercise includes activities that increase your
              breathing and heart rate such as walking, jogging, swimming,
              biking and jumping rope.
            </Text>
          </View>
          <View style={styles.block.container}>
            <Image
              source={require("../../assets/strength-training.jpg")}
              style={styles.block.image}
            />
            <Text style={styles.block.title}>Strength Training</Text>
            <Text style={styles.block.text}>
              Strength training is a type of exercise that causes your muscles
              to contract against an outside resistance.
            </Text>
          </View>
          <View style={styles.block.container}>
            <Image
              source={require("../../assets/balance-training.png")}
              style={styles.block.image}
            />
            <Text style={styles.block.title}>Balance Training</Text>
            <Text style={styles.block.text}>
              Performing balance exercises can help a person maintain or
              increase their coordination and strength.
            </Text>
          </View>
          <View style={styles.block.container}>
            <Image
              source={require("../../assets/flexibility-training.jpg")}
              style={styles.block.image}
            />
            <Text style={styles.block.title}>Flexibility Training</Text>
            <Text style={styles.block.text}>
              Flexibility exercises stretch your muscles and can help your body
              move and bend easier.
            </Text>
          </View>
        </ScrollView>
      </View>
      <Banner active="workout" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    height: "72%",
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  flexBox: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    text: {
      fontSize: 13,
      fontWeight: "300",
    },
    redText: {
      fontSize: 13,
      fontWeight: "300",
      color: "red",
      marginLeft: 5,
      marginRight: 2,
    },
    block: {
      paddingTop: 10,
      marginLeft: 0,
      marginTop: 10,
      fontSize: 12,
      borderRadius: 18,
      padding: 5,
      textAlign: "center",
      overflow: "hidden",
      marginBottom: 20,
    },
    active: {
      width: 50,
      padding: 10,
      marginLeft: 0,
      marginRight: 10,
      backgroundColor: theme.color.primary,
    },
  },
  block: {
    container: {
      padding: 10,
      backgroundColor: theme.color.background,
      marginBottom: 20,
      borderRadius: 10,
    },
    image: {
      width: "100%",
      height: 260,
      borderRadius: 10,
      resizeMode: "stretch",
    },
    title: {
      position: "absolute",
      color: "white",
      fontSize: 36,
      fontWeight: "700",
      wordWrap: "break-word",
      width: 240,
      top: 175,
      left: 25,
    },
    text: {
      fontSize: 13,
      marginTop: 10,
      color: "#383838",
    },
  },
});
