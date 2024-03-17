import {
    View,
    Text,
    StyleSheet,
    Pressable
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Topbar(props) {
    return (
        <View style={styles.container}>
            {props.history && <FontAwesome5 name="history" size={20} color="#41C9E2" style={styles.left} />}
            <Text style={styles.title}>{props.title}</Text>
            {props.post && <Feather name="plus-circle" size={22} color="#41C9E2" style={styles.right} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5'
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    left: {
        position: 'absolute',
        left: 15,
        top: 0,
        bottom: 0,
        justifyContent: 'center'
    },
    right: {
        position: 'absolute',
        right: 15,
        top: 0,
        bottom: 0,
        justifyContent: 'center'
    }
})