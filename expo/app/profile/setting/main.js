import {ScrollView, Text, View} from "react-native";
import {useContext} from "react";

import {SessionContext} from "../../_layout";

import Topbar from "../../../components/topbar";
import Select from "../../../components/select";
import theme from "../../../theme";

export default function Setting({navigation}) {
    const session = useContext(SessionContext)

    return (
        <View style={styles.container}>
            <Topbar title="Profile"
                    leftIcon="back"
                    leftPress={navigation.goBack}/>
            <ScrollView>
                <Text style={styles.title}>
                    Account Setting
                </Text>
                <Select text="Change Nickname"
                        value={session?.profile.nickname} first={true}
                        onPress={() => navigation.navigate("Settings/ChangeNickname")}/>
                <Select text="Change Email" value={session?.user.email}/>
                <Select text="Change Password" value="********"
                        onPress={() => navigation.navigate("Settings/ChangePassword")}/>
                <Text style={{...styles.danger.title}}>
                    Danger Zone
                </Text>
                <Select text="Logout" danger={true} onPress={() => navigation.navigate("Settings/Logout")}/>
                <Select text="Delete Account"
                        danger={true} last={true}
                        onPress={() => navigation.navigate("Settings/DeleteAccount")}/>
            </ScrollView>
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
    },
    title: {
        backgroundColor: theme.color.background,
        fontSize: 14,
        padding: 8,
        paddingLeft: 12,
        color: '#737373'
    },
    danger: {
        title: {
            backgroundColor: "rgba(255,127,127,0.45)",
            fontSize: 14,
            padding: 8,
            paddingLeft: 12,
            color: '#ff0000',
            borderColor: '#ff0000',
            borderWidth: 1,
        }
    }
}