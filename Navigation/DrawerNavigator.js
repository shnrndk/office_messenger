
import React from "react";
import Home from "../Components/home";
import Profile from "../Components/profile";
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem } from "@react-navigation/drawer";
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Logout" onPress={() => {
                  firebase.auth().signOut()
                  AsyncStorage.removeItem("department").then((value) => {
                    console.log("Async Storage Cleared")
                  })
                  AsyncStorage.removeItem("avator").then((value) => {
                    console.log("Async Storage Cleared")
                  })
                
                } 
                  } />
              </DrawerContentScrollView>
            )
          }}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} />
          </Drawer.Navigator>



        
        
    );
}

export { DrawerNavigator };