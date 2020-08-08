// @flow
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import SelectDept from './Departments/SelectDept';


function Home({ navigation }) {

  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => {
      navigation.openDrawer();
  } ;

  function goToChat(value){
    navigation.navigate('Chat',{
      groupName:value
    })
  }

  const [header, setHeader] = useState(null)
  

  

  useEffect(() => {
    AsyncStorage.getItem("department").then((value) => {
      setHeader(value)
    })
  }, [header])

  return (
    <View>
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={_handleMore} />
        <Appbar.Content title={header} subtitle="Click a chat group to choose" />
        
      </Appbar.Header>
      <Text style={styles.text}>Available Chat Groups</Text>
      <View style={styles.container}>
        <SelectDept goToChat={goToChat}/>
      </View>


    </View>
  );

}


export default Home;



const styles = StyleSheet.create({

  btn: {
    marginTop: 5,
    marginHorizontal: 20,
    paddingVertical: 6,
    marginBottom: 5,
    borderRadius: 10
  },
  container: {
    marginTop: 30,

  },
  text:{
    fontSize:20,
    fontWeight:"bold",
    textAlign:"center",
    textShadowColor:"grey",
    textShadowRadius:4,
    marginTop:30
  }
})
