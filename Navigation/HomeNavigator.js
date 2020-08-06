import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Components/home";
import Chat from "../Components/chat";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerNavigator } from "./DrawerNavigator";




const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{
        headerShown: false
      }}>   
        <HomeStack.Screen name="Home" component={DrawerNavigator} />
        <HomeStack.Screen name="Chat" component={Chat} />
      </HomeStack.Navigator>
  );
}

export { HomeStackNavigator };