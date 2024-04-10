import Card from "../../components/card";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView, View } from "react-native";
import { useContext } from "react";
import { SessionContext } from "../_layout";
import { router } from "expo-router";

import Topbar from "../../components/topbar";

export default function Home({ navigation }) {
    const session = useContext(SessionContext)

    return (
        <View style={styles.container}>
            <Topbar title="Home"
                history={true}
                post={() => navigation.navigate('Post')}
                leftIcon={<FontAwesome5 name="history" size={20} color="#41C9E2" style={styles.left} />}
                rightIcon={<Feather name="plus-circle" size={22} color="#41C9E2" />}
                rightPress={() => navigation.navigate('Post')}
            />
            {
                session.user && (
                    <ScrollView>
                        <Card icon={<FontAwesome5 name="running" size={24} color="black" />}
                            title="Do a quick run" btn="Start exercise >"
                            onPress={() => router.push('/workout')}
                            text="Running is a great way to get some exercise and you can do it anywhere, anytime." />
                        <Card icon={<FontAwesome5 name="user-friends" size={20} color="black" />}
                            title="Write a post" btn="Write now >"
                            onPress={() => navigation.navigate('Post')}
                            text="Just broke through your personal best, or maybe you just want to share your thoughts? Write a post and share it with MVPA community." />
                    </ScrollView>
                )
            }
        </View>
    )
}

const styles = {
    container: {
        flex: 1
    }
}