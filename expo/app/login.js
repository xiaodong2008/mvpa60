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
import message from "../message"

import theme from "../theme";
import Button from "../components/button";
import Input from "../components/input";

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
                <View style={styles.box}>
                    <Text
                        style={styles.form.title}>
                        {mode === "register" ? "Create a Account" : "Login to your Account"}
                    </Text>
                    <Input color="white" text="Email" event={setEmail}/>
                    <Input color="white" text="Password" event={setPassword} secure={true}/>
                    {
                        mode === "register" &&
                        <Input color="white"
                               secure={true}
                               text="Confirm Password"
                               event={setConfirmPassword}/>
                    }
                    <Button width={300}
                            onPress={submit}
                            text={mode === "register" ? "Sign Up" : "Log In"}
                            loading={loading}
                    />
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
                </View>
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

        Keyboard.dismiss();

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
            message.success("Register successful, Please confirm register with your email.")
        }).catch(err => {
            setLoading(false);
            setAlert(err.message);
        })
    }

    function login() {
        user.login(email, password).then(res => {
            setLoading(false);
            console.log(props.success)
            // props.success()
            props.navigation.goBack()
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
        display: "flex",
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
        position: 'relative',
    },
    box: {
        display: "flex",
        alignItems: 'center',
        width: 300,
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
            height: '40%',
            bottom: -50,
            zIndex: 100,
        }
    }
});