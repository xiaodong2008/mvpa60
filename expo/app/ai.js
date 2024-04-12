import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ScrollView,
    Image,
} from "react-native";
import React from "react";

import Banner from "../components/banner";
import Topbar from "../components/topbar";
import theme from "../theme";

import user from "../user";

export default function Page() {
    const [avatarUri, setAvatarUri] = React.useState(null);
    const [input, setInput] = React.useState("");
    const [messages, setMessages] = React.useState([
        { text: "Hello, how can I help you?", from: "ai" },
    ]);

    React.useEffect(() => {
        user.getAvatar().then((uri) => {
            if (uri) setAvatarUri(uri);
        });
    });

    function sendMsg() {
        const msg = { text: input, from: "user" };
        setInput("");
        messages.push(msg);
        messages.push({
            text: "|",
            from: "ai",
        });
        const fakeReply =
            "MVPA60 aims to encourage students to develop a habit of regularly taking part in physical activities as early as possible in order to achieve the World Health Organisation (WHO)’s recommendation that children and adolescents aged 5-17 should accumulate at least an average of 60 minutes daily of moderate-to vigorous-intensity physical activities across the week.";
        let i = 0;
        setTimeout(() => {
            const val = setInterval(() => {
                messages.pop();
                messages.push({
                    text:
                        fakeReply.slice(0, i) +
                        (i === fakeReply.length ? "" : "|"),
                    from: "ai",
                });
                setMessages([...messages]);
                if (i++ === fakeReply.length) {
                    clearInterval(val);
                }
            }, 5);
        }, 500);
    }

    return (
        <View style={theme.styles.pageRoot}>
            <Topbar title="AI" />
            <View style={styles.container}>
                <View style={styles.main.container}>
                    <ScrollView>
                        {messages.map((msg, i) => (
                            <View key={i} style={styles.main.msg.container}>
                                <Image
                                    source={
                                        msg.from === "ai"
                                            ? require("../assets/openai.png")
                                            : !avatarUri
                                            ? require("../assets/default-avatar.png")
                                            : { uri: avatarUri }
                                    }
                                    style={styles.main.msg.avatar}
                                />
                                <Text style={styles.main.msg.text}>
                                    {msg.text}
                                </Text>
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
        </View>
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
            width: "100%",
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
