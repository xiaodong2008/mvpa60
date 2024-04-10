import Card from "../../components/card";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView, View, Image, Text } from "react-native";
import { useContext } from "react";
import { SessionContext } from "../_layout";
import { router } from "expo-router";

import Topbar from "../../components/topbar";

import theme from "../../theme";

export default function Home({ navigation }) {
  const session = useContext(SessionContext);

  return (
    <View style={styles.container}>
      <Topbar
        title="Home"
        history={true}
        post={() => navigation.navigate("Post")}
        leftIcon={
          <FontAwesome5
            name="history"
            size={20}
            color="#41C9E2"
            style={styles.left}
          />
        }
        rightIcon={<Feather name="plus-circle" size={22} color="#41C9E2" />}
        rightPress={() => navigation.navigate("Post")}
      />
      {session.user && (
        <ScrollView>
          {/* <Card
            icon={<FontAwesome5 name="running" size={24} color="black" />}
            title="Do a quick run"
            btn="Start exercise >"
            onPress={() => router.push("/workout")}
            text="Running is a great way to get some exercise and you can do it anywhere, anytime."
          />
          <Card
            icon={<FontAwesome5 name="user-friends" size={20} color="black" />}
            title="Write a post"
            btn="Write now >"
            onPress={() => navigation.navigate("Post")}
            text="Just broke through your personal best, or maybe you just want to share your thoughts? Write a post and share it with MVPA community."
          /> */}
          <View style={styles.block.container}>
            <Image
              style={{
                width: "100%",
                height: 220,
                borderRadius: 10,
                resizeMode: "stretch",
              }}
              source={require("../../assets/mvpa-cover.png")}
            ></Image>
            <Text style={{
                fontSize: 13,
                marginTop: 10,
                color: "#383838"
            }}>
              The “MVPA60 Award Scheme” (Scheme) aims to encourage students to
              develop a habit of regularly taking part in physical activities as
              early as possible in order to achieve the World Health
              Organisation (WHO)’s recommendation that children and adolescents
              aged 5-17 should accumulate at least an average of 60 minutes
              daily of moderate-to vigorous-intensity physical activities
              (MVPA60) across the week, through which students can cultivate
              positive values and attitudes such as perseverance and willingness
              to accept challenges.
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  block: {
    container: {
      padding: 10,
      backgroundColor: theme.color.background,
      margin: 20,
      borderRadius: 10,
    },
  },
};
