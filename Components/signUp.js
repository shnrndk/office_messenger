const { disableExpoCliLogging } = require("expo/build/logs/Logs")

import React, { useState } from 'react';
import { StyleSheet, Text, View, Picker ,ScrollView,SafeAreaView} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';

export default function SignUp() {

  const [state, setstate] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
  })

  const [department, setdepartment] = useState('Management');

  const onRegisterSuccess = () => {
    setstate({
      error: '',
      loading: false

    })
  }


  const handleSubmit = (values) => {
    delete values.passwordConfirmation;
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
      .catch((error) => {
        console.log(error)
      })
      .then((user) => {
        onRegisterSuccess();
        const userDetails = {
          email: values.email,
          first_name: values.first_name,
          dept:department
        }
        firebase.database().ref('users').push(userDetails).then(()=>{
          async function storeUser() {
            try {
              await AsyncStorage.setItem('username', values.first_name)
              await AsyncStorage.setItem('email', values.email)
              await AsyncStorage.setItem('department',department)
            } catch (e) {
              console.log(e)
            }
          }
  
          storeUser();
        })

        

      })
  }


  let registerSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters or Numbers.'),
    first_name: yup.string().required('First Name is Required'),
    passwordConfirmation: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),

  })


  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
    <View>
      <Text style={styles.txtLogin}>Fill These Details</Text>
      <Formik
        initialValues={{ password: '', first_name: '', email: '', passwordConfirmation: '' }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={registerSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <View>
            <TextInput
              style={styles.textInputTop}
              onChangeText={handleChange('first_name')}
              onBlur={handleBlur('first_name')}
              value={values.first_name}
              label="First Name"
              mode="outlined"
            />

            <Text style={styles.errorMsg}>{touched.last_name && errors.last_name}</Text>
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

            <TextInput
              style={styles.textInput}
              onChangeText={handleChange('passwordConfirmation')}
              onBlur={handleBlur('passwordConfirmation')}
              value={values.passwordConfirmation}
              label="ReEnter Password"
              secureTextEntry={true}
              mode="outlined"
            />
            <Text style={styles.errorMsg}>{touched.passwordConfirmation && errors.passwordConfirmation}</Text>
            <View style={styles.pickerContainer}>
              <Text style={styles.depText}>Department</Text>
              <Picker
                selectedValue={department}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) => setdepartment(itemValue)}
                mode={"dropdown"}
              >
                <Picker.Item label="Management" value="Management" />
                <Picker.Item label="HR" value="HR" />
                <Picker.Item label="Accounting" value="Accounting" />
                <Picker.Item label="Sales" value="Sales" />
              </Picker>
            </View>
            <Button style={styles.btn} mode="contained" onPress={handleSubmit}>
              <Text style={{ color: "white" }}>Sign Up</Text>
            </Button>
          </View>
        )}
      </Formik>

    </View>
    </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 15,
    marginTop: 6,
  },
  textInputTop: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  btn: {
    marginTop: 20,
    marginHorizontal: 80,
    paddingVertical: 6,
    marginBottom: 30,
    borderRadius: 30
  },
  txtLogin: {
    marginTop: 45,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6b6dee',
    marginHorizontal: 15,
  },
  errorMsg: {
    color: 'red',
    marginHorizontal: 15,
  },
  pickerContainer:{
    marginHorizontal: 15,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  depText:{
    
    color:"grey",
    fontSize:17,
    marginHorizontal:40,
    marginVertical:10,
  }
})