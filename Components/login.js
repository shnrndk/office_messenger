import React,{useState} from 'react';
import { Formik } from 'formik';
import { StyleSheet, Text, View } from 'react-native';
import * as yup from 'yup';
import { Button, TextInput } from 'react-native-paper';
export default function Login(){


    let loginSchema = yup.object({
        email: yup.string().required('Email is Required').email('Invalid Format'),
        password: yup.string().required('Password is Required')
    })
    

    return(
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
        color: '#4fc116'
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