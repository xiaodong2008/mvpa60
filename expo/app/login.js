import {
    Text,
    StyleSheet,
    Pressable,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { get } from '../api';
import React, { useState, useEffect } from 'react';
import Icon from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';

import Banner from '../components/banner';

export default function Page() {
    // wait to get title
    const [alert, setAlert] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.form.title}>Create a Account</Text>
                <TextInput style={styles.input} placeholder='Email' onChangeText={setEmail}></TextInput>
                <TextInput style={styles.input} placeholder='Password' onChangeText={setPassword}></TextInput>
                <TextInput style={styles.input} placeholder='Confirm Password' onChangeText={setConfirmPassword}></TextInput>
                <Pressable onPress={register}>
                    <Text style={loading ? styles.disableBtn : styles.btn}>
                        {/* {
                            loading ? <Icon name="reload" size={18}></Icon> : null
                        } */}
                        Sign Up
                    </Text>
                </Pressable>
                {
                    alert ? <Text style={styles.alert}>{alert}</Text> : null
                }
                {/* Switch to login page */}
                <Link style={styles.link} href="/">Already have a account?</Link>
                <Banner />
            </View>
        </TouchableWithoutFeedback>
    );

    function register() {
        if (loading) return console.log("bb");
        if (email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
            setAlert("Email and password are required.");
            return;
        }
        if (/^(([a-zA-Z0-9\-_]\.)*[A-Za-z0-9]+)@(([a-zA-Z0-9\-]+\.)*([a-zA-Z]{2,}))+$/.test(email) === false) {
            setAlert("Email is not valid.")
            return;
        }
        if (password !== confirmPassword) {
            setAlert("Password mismatched.")
            return;
        }
        setAlert("");
        // disable signup
        setLoading(true);
        styles.btn.backgroundColor = 'gray';
        console.log(2);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // width: 300,
        margin: 'auto',
        // borderWidth: 1,
    },
    form: {
        title: {
            fontSize: 28,
            color: 'gray',
            fontWeight: 'bold',
            marginBottom: 20,
        },
    },
    test: {
        borderWidth: 1
    },
    input: {
        width: 300,
        height: 30,
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    btn: {
        width: 300,
        height: 36,
        color: 'white',
        backgroundColor: '#41C9E2',
        fontSize: 18,
        fontWeight: '700',
        borderRadius: 10,
        overflow: 'hidden',
        textAlign: 'center',
        lineHeight: 36,
    },
    disableBtn: {
        width: 300,
        height: 36,
        color: 'white',
        backgroundColor: 'gray',
        fontSize: 18,
        fontWeight: '700',
        borderRadius: 10,
        overflow: 'hidden',
        textAlign: 'center',
        lineHeight: 36,
    },
    alert: {
        color: 'red',
        width: 300,
        marginTop: 3
    },
    link: {
        // float
        width: 300,
        textAlign: 'right',
        color: 'blue',
        marginTop: 10
    }
});