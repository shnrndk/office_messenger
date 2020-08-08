import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, TextInput } from 'react-native-paper';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
export default function Login() {


    const [state, setstate] = useState({
        email: '',
        password: '',
        error: '',
        loading: false
    })

    const [driver, setUser] = useState(null)

    const handleSubmit = (values) => {
        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;

                // User not found? Create user.
                if (errorCode === 'auth/user-not-found') {

                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == 'email-already-in-use') {
                        alert('You already have an account with that email.');
                    } else if (errorCode == 'auth/invalid-email') {
                        alert('Please provide a valid email');
                    } else if (errorCode == 'auth/weak-password') {
                        alert('The password is too weak.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);

                    // Wrong Password Error
                } else if (errorCode === 'auth/wrong-password') {
                    // Check if User has signed up with a OAuthProvider
                    alert('Wrong password. Please try again');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            })
            .then((res) => {
                
                
                firebase.database().ref('users').on('value', (snapshot) => {
                    var users = snapshot.val();

                    const tempUser = [];

                    for (let key in users) {
                        if (users[key]['email'] == values.email) {
                            async function storeUser() {
                                
                                try {
                                    await AsyncStorage.setItem('username', users[key].first_name)
                                    await AsyncStorage.setItem('email', users[key].email)
                                    await AsyncStorage.setItem('department', users[key].dept)
                                    await AsyncStorage.setItem('avator', users[key].avator)
                                } catch (e) {
                                    console.log(e)
                                }
                            }
                            
                            storeUser().then(()=>{
                                onLoginSuccess()
                            })
                            
                        }

                    }


                }

                )


            })
    }

    const onLoginSuccess = () => {
        setstate({
            error: '',
            loading: false

        })
    }

    let loginSchema = yup.object({
        email: yup.string().required('Email is Required').email('Invalid Format'),
        password: yup.string().required('Password is Required')
    })

    return (
        <View style={styles.container}>

            <View >
                <Text style={styles.txtLogin}>Login</Text>
                <Text style={styles.txtLoginHint}>Login with Email and Password</Text>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={values => handleSubmit(values)}
                    validationSchema={loginSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                label="Email"
                                mode="outlined"
                            />
                            <Text style={styles.errorMsg}>{touched.email && errors.email}</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                label="Password"
                                secureTextEntry={true}
                                mode="outlined"
                            />
                            <Text style={styles.errorMsg}>{touched.password && errors.password}</Text>

                            <Button style={styles.btnSignIn} mode="contained" onPress={handleSubmit}>
                                <Text style={{ color: "white" }}>Sign In</Text>
                            </Button>
                        </View>
                    )}
                </Formik>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    txtLogin: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#6b6dee'
    },
    txtLoginHint: {
        color: '#737373',
        marginBottom: 5

    },
    textInput: {
        marginTop: 6,
    },
    btnSignIn: {
        marginHorizontal: 40,
        paddingVertical: 4,
        marginTop: 20,
        marginVertical: 5,
        borderRadius: 30
    },
    btnRegister: {
        marginHorizontal: 65,
        paddingVertical: 6,
        marginVertical: 10
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: 15
    },
    errorMsg: {
        color: 'red'
    }
})