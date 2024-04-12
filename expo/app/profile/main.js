import { Text, View, StyleSheet } from "react-native";
import { SessionContext } from "../_layout";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../theme";

import Topbar from "../../components/topbar";
import Banner from "../../components/banner";
import Avatar from "./avatar";

export default function Profile({ navigation }) {
    const session = useContext(SessionContext);

    return (
        <View style={theme.styles.pageRoot}>
            <Topbar
                title="Profile"
                rightIcon={
                    <Ionicons
                        name="settings-sharp"
                        size={20}
                        color={theme.color.primary}
                    />
                }
                rightPress={() => navigation.navigate("Settings")}
            />
            <View>
                <Avatar />
                <Text style={styles.name}>
                    {session.profile?.nickname || "Anonymous"}
                </Text>
            </View>
            <Banner active="profile" />
        </View>
    );
}

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 20,
        fontWeight: "bold",
    },
});
