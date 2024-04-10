import { Text, View, Image, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../_layout";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../theme";

import { decode } from "base64-arraybuffer";
import { Buffer } from "buffer";
import axios from "axios";
import db from "../../database";
import user from "../../user";


import Topbar from "../../components/topbar";
import Banner from "../../components/banner";
import message from "../../message";

export default function Profile({ navigation }) {
    const session = useContext(SessionContext)
    const [avatarUri, setAvatarUri] = useState(null)
    const [uploading, setUploading] = useState(false)

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true
        });
        if (!result.canceled) {
            console.log("Image picked");
            setUploading(true)
            const { data, error } = await db.storage.from('avatar').upload(`/${session.user.id}`, decode(result.assets[0].base64), {
                contentType: 'image/*',
                upsert: true
            })
            setUploading(false)
            setAvatarUri(result.assets[0].uri)
            if (error) {
                console.error(error)
                message.error("Failed to upload image")
            } else {
                message.success("Avatar uploaded")
            }
        }
    }

    useEffect(() => {
        async function getAvatar() {
            const { data, error } = await db.storage.from('avatar').createSignedUrl(session.user.id, 3600)
            if (data) {
                setAvatarUri(data.signedUrl)
                axios.get(data.signedUrl, {
                    responseType: "arraybuffer"
                }).then(data => {
                    user.setAvatar(Buffer.from(data.data, 'binary').toString('base64'))
                })
            }
        }

        getAvatar()
    }, [])

    return (
        <View style={theme.styles.pageRoot}>
            <Topbar title="Profile"
                rightIcon={<Ionicons name="settings-sharp" size={20} color={theme.color.primary} />}
                rightPress={() => navigation.navigate("Settings")} />
            <View style={styles.avatar}>
                <Pressable onPress={pickImage}>
                    <Image source={
                        !avatarUri ? require("../../assets/default-avatar.png") : { uri: avatarUri }
                    } style={styles.image} />
                </Pressable>
                {uploading && <View style={styles.loading}>
                    <ActivityIndicator size="large" color={theme.color.primary} />
                </View>}
            </View>

            <Text style={styles.name}>
                {session.profile?.nickname || "Anonymous"}
            </Text>
            <Banner active="profile" />
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20,
        alignSelf: "center",
        overflow: "hidden",
        position: "relative"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    name: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 20,
        fontWeight: "bold"
    },
    loading: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    }
})