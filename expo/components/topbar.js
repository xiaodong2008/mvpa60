import {
    View,
    Text,
    StyleSheet,
    Pressable
} from 'react-native';

import {Feather} from '@expo/vector-icons';
import {FontAwesome5} from '@expo/vector-icons';

export default function Topbar(props) {
    return (
        <View style={styles.container}>
            <Pressable style={styles.left} onPress={props.leftPress}>
                {props.leftIcon}
            </Pressable>
            <Text style={styles.title}>{props.title}</Text>
            <Pressable style={styles.right} onPress={props.rightPress}>
                {props.rightIcon}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        width: '100%'
    },
    left: {
        position: 'absolute',
        left: 15,
        top: 0,
        bottom: 0,
        paddingRight: 10,
        paddingLeft: 10,
    },
    right: {
        position: 'absolute',
        right: 15,
        top: 0,
        bottom: 0,
        paddingRight: 10,
        paddingLeft: 10,
    }
})