import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from './Components/login'
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import SignUp from './Components/signUp';
import { firebaseConfig } from './firebase';
import * as firebase from 'firebase';

const Stack = createStackNavigator();


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}



export default function App() {

  const [state, setstate] = useState({
    loggedIn:false
  })
  
  

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setstate({
          loggedIn: true
        })
      } else {
        setstate({
          loggedIn: false
        })
      }
  
    })
  }, [])

  
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
