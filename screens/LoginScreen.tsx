import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Text, Button, TouchableOpacity } from 'react-native';

import { View } from '../components/Themed';
import { TextInput } from 'react-native-gesture-handler';

import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from "@react-navigation/native";

import { auth } from "../firebase"

interface FormData {
    email: string;
    password: string;
}

function LoginScreen() {

    const { control, setError, handleSubmit, errors, reset } = useForm<
        FormData
    >();
    const navigation = useNavigation();

    const onSubmit = handleSubmit(async ({ email, password }) => {
        await auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                reset({ email: '', password: '' });
                navigation.navigate("Feed");
            })
            .catch((error: { message: any; }) => {
                setError('email', {
                    type: 'firebase',
                    message: error.message,
                });
            });
    });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.all}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.background}>
                    <View style={styles.loginContainer}>
                        <Text style={styles.header}>✍️ Log in</Text>

                        {errors.email?.type === 'firebase' && (
                            <Text style={[styles.errorText, styles.errorTextFirebase]}>{errors.email?.message}</Text>
                        )}

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
                            </View>
                        </View>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    style={styles.inputField}
                                    onBlur={onBlur}
                                    placeholder="Email Address"
                                    value={value}
                                    onChangeText={(value) => onChange(value)}
                                    returnKeyType='done'
                                />
                            )}
                            name='email'
                            rules={{ required: true, pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ }}
                            defaultValue=''
                        />


                        <View style={styles.subheaderContainer}>
                            <Text style={styles.subheader}>Password</Text>
                            <View>
                                {errors.password?.type === 'required' && (
                                    <Text style={styles.errorText}>This field is required.</Text>
                                )}
                            </View>
                        </View>
                        <Controller
                            control={control}
                            render={({ onChange, onBlur, value }) => (
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Password"
                                    onBlur={onBlur}
                                    value={value}
                                    onChangeText={(value) => onChange(value)}
                                    returnKeyType='done'
                                    secureTextEntry
                                />
                            )}
                            name="password"
                            rules={{ required: true }}
                            defaultValue=""
                        />
                        <TouchableOpacity style={styles.button} onPress={onSubmit}>
                            <Text style={styles.buttonText}>Log in with email</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
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

    errorTextFirebase: {
        marginVertical: 10,
    },

    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "black",
        marginBottom: 8,
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

    loginContainer: {
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
        backgroundColor: 'lightblue',
    },
});

export default LoginScreen;