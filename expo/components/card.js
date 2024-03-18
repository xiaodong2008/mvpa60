import {
    Pressable,
    Text,
    View,
    StyleSheet
} from "react-native";
import React from "react";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Card(props) {
    return (
        <Pressable style={styles.card} onPress={props.onPress}>
            <View style={styles.cardTitle}>
                {props.icon}
                <Text style={[styles.cardTitleText]}>{props.title}</Text>
            </View>
            <View style={styles.cardContent}>
                <Text>{props.text}</Text>
                <Text style={styles.cardBtn}>{props.btn || "Go >"}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        margin: 20,
        marginBottom: 0,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5
    },
    cardTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 5
    },
    cardTitleText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    cardContent: {
        flexDirection: 'column'
    },
    cardBtn: {
        color: '#41C9E2',
        marginTop: 10,
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 16
    }
})