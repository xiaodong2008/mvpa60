import {
    StyleSheet,
    Text,
    View
} from "react-native";

import db from "../../../database";

import Topbar from "../../../components/topbar";
import {router} from "expo-router";
import Button from "../../../components/button";
import theme from "../../../theme";

export default function Delete({navigation}) {
    return (
        <View>
            <Topbar title="Delete Account"/>
            <View style={styles.container}>
                <Text style={styles.text}>Are you sure you want to delete your account? Before you do, please note that
                    this action is irreversible and all your data will be lost.</Text>
                <Text style={styles.text}>It will not be possible to recover your account or any of your data and it
                    will be permanently deleted from our database.</Text>
                <Text style={styles.text}>If you are still sure you want to delete your account, please click the button
                    below.</Text>
                <Button color="red"
                        text="Confirm Delete"
                        bold={true}
                        onPress={deleteAccount}
                />
                <Button color={theme.color.gray}
                        text="Cancel"
                        bold={true} top={10}
                        onPress={() => navigation.goBack()}
                />
            </View>
        </View>
    )

    async function deleteAccount() {
        // const {data, error} = await db.schema("auth").from("users").delete()
        await db.auth.signOut()
        router.navigate("/")
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    text: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 20
    }
})