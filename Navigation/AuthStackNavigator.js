import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Intro from "../Components/into";
import Login from "../Components/login";
import SignUp from "../Components/signUp";

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{
        headerShown: false
      }}>
        
        <AuthStack.Screen name="Intro" component={Intro} />
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Sign Up" component={SignUp} />
      </AuthStack.Navigator>
  );
}

export { AuthStackNavigator };