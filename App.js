import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,ActivityIndicator} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from './Components/login';
import Home from './Components/home';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import SignUp from './Components/signUp';
import Firebase from './firebase';
import * as firebase from 'firebase';
import Intro from './Components/into';

const Stack = createStackNavigator();


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



switch (state.loggedIn) {
  case false:
    return (
      <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: true
        }}>
          
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Sign Up" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    )
  case true:
    return (
      <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: true
        }}>
          
          
          <Stack.Screen name="Home" component={Home} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    )
  default:
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
}



}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
