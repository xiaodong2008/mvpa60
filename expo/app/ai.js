import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Background from "../components/background";
import Banner from "../components/banner";
import OpenAI from "openai";
import React from "react";
import Topbar from "../components/topbar";
import theme from "../theme";
import user from "../user";

const openai = new OpenAI({
  apiKey: "sk-Zyc5eQAdWoBaCWzr26F5653367F04e188131A942806d5032",
  baseURL: "https://burn.hair/v1",
});

export default function Page() {
  const [avatarUri, setAvatarUri] = React.useState(null);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([
    {
      text: "Hello! I'm assistant of MVPA60 that help you keep healthy and fit. How can I help you today?",
      from: "assistant",
    },
  ]);

  React.useEffect(() => {
    user.getAvatar().then((uri) => {
      if (uri) setAvatarUri(uri);
    });
  });

  async function sendMsg() {
    setInput("");
    messages.push({ text: input, from: "user" });
    messages.push({
      text: "|",
      from: "assistant",
    });
    const res = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages.map((msg) => ({
        role: msg.from,
        content: msg.text,
      })),
    });
    const reply = res.choices[0].message.content;
    let content = "",
      key = 0;
    const output = setInterval(() => {
      if (key < reply.length) {
        content += reply[key++];
        messages[messages.length - 1].text = content + "|";
      } else {
        messages[messages.length - 1].text = content;
        clearInterval(output);
      }
      setMessages([...messages]);
    }, 10);
  }

  return (
    <KeyboardAvoidingView
      style={theme.styles.pageRoot}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Topbar title="AI" />
      <View style={[theme.styles.pageContent, styles.container]}>
        <View style={styles.main.container}>
          <ScrollView>
            {messages.map((msg, i) => (
              <View key={i} style={styles.main.msg.container}>
                <Image
                  source={
                    msg.from === "assistant"
                      ? require("../assets/openai.png")
                      : !avatarUri
                        ? require("../assets/default-avatar.png")
                        : { uri: avatarUri }
                  }
                  style={styles.main.msg.avatar}
                />
                <Text style={styles.main.msg.text}>{msg.text}</Text>
                {i !== messages.length - 1 && (
                  <Text style={styles.main.msg.line} />
                )}
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.bottom.container}>
          <TextInput
            style={styles.bottom.input}
            placeholder="Enter text"
            value={input}
            onChangeText={setInput}
          />
          <Pressable onPress={sendMsg}>
            <Text style={styles.bottom.text}>Send</Text>
          </Pressable>
        </View>
      </View>
      <Banner active="ai" />
      <Background />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    height: "100%",
    alignItems: "center",
  },
  main: {
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      width: "90%",
      height: "80%",
    },
    msg: {
      container: {
        display: "flex",
        flexDirection: "row",
        padding: 10,
        borderRadius: 10,
        margin: 5,
      },
      avatar: {
        width: 30,
        height: 30,
        marginRight: 10,
        borderRadius: 15,
      },
      text: {
        marginRight: 30,
      },
      line: {
        width: "100%",
        height: 1,
        backgroundColor: "gray",
        margin: 5,
        position: "absolute",
        bottom: -10,
      },
    },
  },
  bottom: {
    container: {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      bottom: 20,
      borderWidth: 1,
      borderColor: "#656565",
      borderRadius: 10,
      width: "80%",
      backgroundColor: "white",
      padding: 5,
    },
    input: {
      paddingLeft: 10,
      flexGrow: 1,
    },
    text: {
      color: theme.color.primary,
      padding: 8,
      borderRadius: 8,
      overflow: "hidden",
      fontWeight: "700",
    },
  },
});
