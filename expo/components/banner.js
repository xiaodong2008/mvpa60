import Icon from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Banner(props) {
    return (
        <View style={styles.container}>
            <Link href="/">
                <View style={styles.icon}>
                    <Icon name={props.active === "home" ? "home" : "home-outline"} size={30} color="gray" />
                    <Text style={styles.text}>Home</Text>
                </View>
            </Link>
            <Link href="/ai">
                <View style={styles.icon}>
                    <Icon name={props.active === "ai" ? "sparkles-sharp" : "sparkles-outline"} size={30} color="#ffd700"/>
                    <Text style={styles.ai}>AI</Text>
                </View>
            </Link>
            <Link href="/profile">
                <View style={styles.icon}>
                    <Icon name={props.active === "profile" ? "person" : "person-outline"} size={30} color="gray" />
                    <Text style={styles.text}>User</Text>
                </View>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        borderTopWidth: 1,
        borderColor: 'gray',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-around',
        bottom: 0
    },
    icon: {
        width: 50,
        height: 30,
        alignItems: 'center'
    },
    ai: {
        fontSize: 12,
        color: '#ffd700'
    },
    text: {
        fontSize: 12,
        color: 'gray',
    }
});