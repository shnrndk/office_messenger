import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Components/home";
import Chat from "../Components/chat";


const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{
        headerShown: false
      }}>   
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="Chat" component={Chat} />
      </HomeStack.Navigator>
  );
}

export { HomeStackNavigator };