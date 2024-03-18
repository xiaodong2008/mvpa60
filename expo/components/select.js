import {
    Pressable,
    Text,
    View,
    StyleSheet,
} from "react-native";

export default function Select(props) {
    return (
        <Pressable style={styles.container} onPress={props.onPress}>
            <View style={[styles.box, props.first || {borderTopWidth: 1}, props.last && {borderBottomWidth: 1}]}>
                <Text style={[props.danger && styles.danger, styles.text]}>{props.text}</Text>
                <Text style={styles.value}>{props.value} &gt;</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
    },
    box: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 54,
        borderTopColor: "rgba(204,204,204,0.89)",
        borderBottomColor: "rgba(204,204,204,0.89)",
    },
    danger: {
        color: "red"
    },
    text: {
        fontSize: 15,
        textAlign: "left",
        // width: "100%",
    },
    value: {
        fontSize: 15,
        color: "rgba(204,204,204,0.89)",
        marginLeft: "auto",
    },
});