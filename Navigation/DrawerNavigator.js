
import React from "react";
import Home from "../Components/home";
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem } from "@react-navigation/drawer";
import * as firebase from 'firebase';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={props => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Logout" onPress={() => firebase.auth().signOut() } />
              </DrawerContentScrollView>
            )
          }}>
            <Drawer.Screen name="Home" component={Home} />
            
          </Drawer.Navigator>



        
        
    );
}

export { DrawerNavigator };