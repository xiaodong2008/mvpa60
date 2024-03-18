import {
    Text,
    StyleSheet,
    Pressable,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
    ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {LinearGradient} from "expo-linear-gradient";
import user from "../user";

import theme from "../theme";

export default function Page(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [alert, setAlert] = useState("");
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState("register");

    // let session = useContext()

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.form.title}>{mode === "register" ? "Create a Account" : "Login to your Account"}</Text>
                <TextInput style={styles.input}
                           placeholder='Email'
                           placeholderTextColor={'rgba(231,231,231,0.81)'}
                           onChangeText={setEmail}></TextInput>
                <TextInput style={styles.input}
                           placeholder='Password'
                           placeholderTextColor={'rgba(231,231,231,0.81)'}
                           onChangeText={setPassword}></TextInput>
                {
                    mode === "register" && <TextInput style={styles.input}
                                                      placeholder='Confirm Password'
                                                      placeholderTextColor={'rgba(231,231,231,0.81)'}
                                                      onChangeText={setConfirmPassword}></TextInput>
                }
                <Pressable onPress={submit}>
                    <View style={styles.btn.container}>
                        {
                            loading ? <ActivityIndicator/> :
                                <Text style={styles.btn.text}>{mode === "register" ? "Sign Up" : "Log In"}</Text>
                        }</View>
                </Pressable>
                {
                    alert ? <Text style={styles.alert}>{alert}</Text> : null
                }
                <Text style={styles.text} onPress={switchMode}>
                    {
                        mode === "register" ? "Already have a account? " : "Don't have a account? "
                    }
                    <Text style={styles.link}>
                        {
                            mode === "register" ? "Log In >" : "Register Now >"
                        }
                    </Text>
                </Text>
                {background()}
            </View>
        </TouchableWithoutFeedback>
    );

    function submit() {
        if (loading) return;
        if (!email || !password) {
            return setAlert("Email and password are required.");
        }
        if (mode === "register" && !confirmPassword) {
            return setAlert("Confirm password is required.");
        }
        if (/^(([a-zA-Z0-9\-_]\.)*[A-Za-z0-9]+)@(([a-zA-Z0-9\-]+\.)*([a-zA-Z]{2,}))+$/.test(email) === false) {
            setAlert("Email is not valid.")
            return;
        }
        if (mode === "register" && password !== confirmPassword) {
            return setAlert("Password mismatched.");
        }
        setAlert("");
        setLoading(true);

        if (mode === "register") {
            register(email, password);
        } else {
            login(email, password);
        }
    }

    function switchMode() {
        setAlert("");
        setMode(mode === "register" ? "login" : "register");
    }

    function register() {
        user.register(email, password).then(res => {
            setLoading(false);
            props.success()
        }).catch(err => {
            setLoading(false);
            setAlert(err.message);
        })
    }

    function login() {
        user.login(email, password).then(res => {
            setLoading(false);
            console.log(props.success)
                props.success()
        }).catch(err => {
            setLoading(false);
            setAlert(err.message);
        })
    }
}

function background() {
    return (
        <View style={styles.background.container}>
            <Image style={styles.background.image} source={require('../assets/run-background.png')}></Image>
            {/*<Text style={styles.background.hide}></Text>*/}
            <LinearGradient colors={['transparent', 'black', 'black']} style={styles.background.hide}></LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        position: 'relative',
    },
    form: {
        title: {
            fontSize: 28,
            color: 'white',
            fontWeight: 'bold',
            marginBottom: 20,
        },
    },
    test: {
        borderWidth: 1
    },
    input: {
        width: 300,
        height: 36,
        borderBottomWidth: 1,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 20,
        color: 'white',
        borderColor: 'rgba(255,255,255,0.29)',
        backgroundColor: 'rgba(255,255,255,0.29)',
        paddingLeft: 10,
    },
    btn: {
        container: {
            width: 300,
            height: 36,
            borderRadius: 8,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: theme.color.primary,
        },
        text: {
            color: 'white',
            fontSize: 14,
            fontWeight: '700',
            textAlign: 'center',
            lineHeight: 36
        }
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
    text: {
        color: 'gray',
        marginTop: 10,
        fontSize: 14,
        lineHeight: 20,
    },
    link: {
        color: theme.color.primary,
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 26,
        marginLeft: 5,
    },
    linkContainer: {},
    background: {
        container: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: -1,
        },
        image: {
            position: 'absolute',
            transform: [{scale: 1.6}],
            top: 100,
            zIndex: 10,
        },
        hide: {
            position: 'absolute',
            width: '100%',
            height: 300,
            bottom: -50,
            zIndex: 100,
        }
    }
});