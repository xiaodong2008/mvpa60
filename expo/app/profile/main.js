import {Text, View} from "react-native";
import {useContext} from "react";
import {SessionContext} from "../_layout";
import {Ionicons} from "@expo/vector-icons";
import theme from "../../theme";

import Topbar from "../../components/topbar";

export default function Profile({navigation}) {
    const session = useContext(SessionContext)

    return (
        <View style={theme.styles.pageRoot}>
            <Topbar title="Profile"
                    rightIcon={<Ionicons name="settings-sharp" size={20} color={theme.color.primary} />}
                    rightPress={() => navigation.navigate("Settings")} />
            <Text>
                Name:
                {session.profile?.nickname || "Anonymous"}
            </Text>
        </View>
    )
}