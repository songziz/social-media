import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, firebase } from "../firebase";


type FormData = {
    email: string;
    password: string;
    username: string;
    emoji: string;
};


function RegisterScreen() {
    const navigation = useNavigation();

    const { control, setError, handleSubmit, errors, reset } = useForm<
        FormData
    >();

    const onSubmit = handleSubmit(async ({ email, password }) => {
        const shouldGo = await auth.createUserWithEmailAndPassword(email, password)
            .then(async (newUser: firebase.auth.UserCredential) => {
                const uid = newUser.user!.uid;
                //const user = await newCustomer({ email, uid });
                //setUser(user);
                reset({ email: '', password: '' });
            }).catch((error: { message: any; }) => {
                setError('email', {
                    type: 'manual',
                    message: error.message,
                });
            });
    });

    const eyeOff = <Feather name="eye-off" size={24} />;
    const eye = <Feather name="eye" size={24} />;

    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.screen}>
            <View style={styles.all}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.background}>
                    <View style={styles.registerContainer}>
                        <Text style={styles.header}>📇 Create an account</Text>

                        <View style={styles.subheaderContainer}>
                            <Text style={styles.subheader}>Email Address</Text>
                            <View>
                                {errors.email?.type === "required" && (
                                    <Text style={styles.errorText}>This field is required.</Text>
                                )}
                                {errors.email?.type === "pattern" && (
                                    <Text style={styles.errorText}>
                                        Invalid email.
                                    </Text>
                                )}
                                {errors.email?.type === "manual" && (
                                    <Text style={styles.errorText}>Email already in use.</Text>
                                )}
                            </View>
                        </View>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    style={styles.inputField}
                                    onBlur={onBlur}
                                    onChangeText={(value) => onChange(value)}
                                    value={value}
                                    placeholder="Email Address"
                                    keyboardType='email-address'
                                    returnKeyType='done'
                                />
                            )}
                            name="email"
                            rules={{
                                required: true,
                                pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                            }}
                            defaultValue=""
                        />

                        <View style={styles.subheaderContainer}>
                            <Text style={styles.subheader}>Password</Text>
                            <View>
                                {errors.password?.type === "required" && (
                                    <Text style={styles.errorText}>This field is required.</Text>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <Text style={styles.errorText}>
                                        Must be at least 6 characters.
                                    </Text>
                                )}
                            </View>
                        </View>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <View style={styles.passwordContainer}>
                                    <TextInput
                                        style={[styles.inputField, styles.passwordText]}
                                        onBlur={onBlur}
                                        onChangeText={(value) => onChange(value)}
                                        value={value}
                                        placeholder="Password"
                                        secureTextEntry={secureTextEntry}
                                        returnKeyType='done'
                                    />
                                    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
                                        {!secureTextEntry ? eye : eyeOff}
                                    </TouchableWithoutFeedback>
                                </View>
                            )}
                            name="password"
                            rules={{ required: true, minLength: 6 }}
                            defaultValue=""
                        />

                        <View style={styles.subheaderContainer}>
                            <Text style={styles.subheader}>Username</Text>
                            <View>
                                {errors.username?.type === "required" && (
                                    <Text style={styles.errorText}>This field is required.</Text>
                                )}
                                {errors.username?.type === "pattern" && (
                                    <Text style={styles.errorText}>
                                        Invalid username.
                                    </Text>
                                )}
                                {errors.username?.type === "manual" && (
                                    <Text style={styles.errorText}>Username already in use.</Text>
                                )}
                            </View>
                        </View>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    style={styles.inputField}
                                    onBlur={onBlur}
                                    onChangeText={(value) => onChange(value)}
                                    value={value}
                                    placeholder="Username"
                                    returnKeyType='done'
                                />
                            )}
                            name="username"
                            rules={{
                                required: true,
                                pattern: /^([a-zA-Z0-9_\-\.]+)$/,
                            }}
                            defaultValue=""
                        />

                        <View style={styles.subheaderContainer}>
                            <Text style={styles.subheader}>Emoji</Text>
                            <View>
                                {errors.emoji?.type === "required" && (
                                    <Text style={styles.errorText}>This field is required.</Text>
                                )}
                                {errors.emoji?.type === "pattern" && (
                                    <Text style={styles.errorText}>
                                        Invalid emoji.
                                    </Text>
                                )}
                            </View>
                        </View>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    style={styles.inputField}
                                    onBlur={onBlur}
                                    onChangeText={(value) => onChange(value)}
                                    value={value}
                                    placeholder="Emoji"
                                    returnKeyType='done'
                                    maxLength={2}
                                />
                            )}
                            name="emoji"
                            rules={{
                                required: true,
                                pattern: /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
                            }}
                            defaultValue=""
                        />

                        <TouchableOpacity style={styles.button} onPress={onSubmit}>
                            <Text style={styles.buttonText}>Register an account</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback >
    );
}

const styles = StyleSheet.create({
    all: {
        width: '100%',
        height: '100%',
    },

    background: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'white',
    },

    button: {
        alignItems: "center",
        backgroundColor: "darkgreen",
        padding: 10,
        marginTop: 10,
    },

    buttonText: {
        color: "white",
        fontSize: 18,
    },

    errorText: {
        color: "red",
        fontSize: 12,
    },

    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: "black",
    },

    inputField: {
        borderWidth: 1,
        marginBottom: 6,
        height: 45,
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 15,
        borderColor: "white",
        backgroundColor: 'white',
        color: 'black',
    },

    passwordContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    passwordText: {
        width: '100%',
        marginRight: -32,
    },

    registerContainer: {
        padding: 10,
        width: '94%',
        borderRadius: 8,
        backgroundColor: 'lightblue',
    },

    screen: {
        height: '100%',
    },

    subheader: {
        fontSize: 12,
    },

    subheaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 2,
        marginBottom: 2,
    },
});

export default RegisterScreen;
