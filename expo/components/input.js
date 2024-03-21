import {
    StyleSheet,
    TextInput, View
} from "react-native";
import theme from "../theme";

export default function Input(props) {
    const styles = StyleSheet.create({
        input: {
            width: props.width ? props.width : "100%",
            height: 36,
            borderWidth: 1,
            borderRadius: 20,
            color: props.color ? props.color : 'black',
            marginBottom: 20,
            borderColor: theme.color.whiteGray,
            backgroundColor: theme.color.whiteGray,
            paddingLeft: 10,
        }
    });

    return (
        <TextInput
            style={styles.input}
            secureTextEntry={props.secure}
            placeholder={props.text}
            placeholderTextColor={theme.color.gray}
            autoCapitalize={props.cap ? props.cap : "sentences"}
            onChangeText={props.event}/>
    );
}