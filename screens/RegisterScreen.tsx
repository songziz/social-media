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
    Button
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, firebase } from "../firebase";


type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
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
                navigation.navigate('Feed');
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

                        <TouchableOpacity style={styles.button} onPress={onSubmit}>
                            <Text style={styles.buttonText}>Register an account</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginContainerText}>Already have an account?</Text>
                    <Button
                        onPress={() => navigation.navigate("Login")}
                        title="Log in here"
                        color="white"
                    >
                    </Button>
                </View>
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
    },

    button: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
    },

    buttonText: {
        color: "black",
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
        color: "white",
    },

    inputField: {
        borderWidth: 1,
        marginBottom: 6,
        height: 45,
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 15,
        borderColor: "white",
    },

    loginContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: '10%',
    },

    loginContainerText: {
        color: "white",
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
