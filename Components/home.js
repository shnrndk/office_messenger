// @flow
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import Chat from './chat';

function ManagementDept(props) {

  

  return (
    <View>
      <Button icon="account-group" style={styles.btn} mode="contained" onPress={() => props.goToChat('Management')}>
          Management Group
      </Button>
        <Button icon="account-group" style={styles.btn} mode="contained" onPress={() => props.goToChat('Management_HR')}>
          HR Group
      </Button>
        <Button icon="account-group" style={styles.btn} mode="contained" onPress={() => props.goToChat('Management_Sales')}>
          Sales Group
      </Button>
      <Button icon="account-group" style={styles.btn} mode="contained" onPress={() => props.goToChat('Management_Accounting')}>
          Accounting Group
      </Button>
    </View>
  )
}

function HrDept() {
  return (
    <View>
    <Button icon="account-group" style={styles.btn} mode="contained" onPress={() => props.goToChat('HR')}>
        HR Group
    </Button>
      <Button icon="account-group" style={styles.btn} mode="contained" onPress={() => props.goToChat('Management_HR')}>
        HR group and Management Group
    </Button>
  </View>
  )
}

function SalesDept() {
  return (
    <View>
      <Button icon="account-group" style={styles.btn} mode="contained" onPress={() => props.goToChat('Sales')}>
          Sales Group
      </Button>
        <Button icon="account-group" style={styles.btn} mode="contained" onPress={() => props.goToChat('Management_Sales')}>
          Sales Group with Management
      </Button>
    </View>
  )
}

function AccountingDep(){
  return (
    <View>
      <Button icon="account-group" style={styles.btn} mode="contained" onPress={() => console.log('Accounting')}>
          Accounting Group
      </Button>
        <Button icon="account-group" style={styles.btn} mode="contained" onPress={() => console.log('Management_Accounting')}>
          Accouting Group with management
      </Button>
    </View>
  )
}


function SelectDept(props){

  const [department, setDepartment] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem("department").then((value) => {
      setDepartment(value)
    })
  })

  switch(department){
    case 'Management':return (<ManagementDept goToChat={props.goToChat}/>);
    case 'HR':return( <HrDept goToChat={props.goToChat} />);
    case 'Sales':return( <SalesDept goToChat={props.goToChat} />);
    case 'Accounting':return( <AccountingDep goToChat={props.goToChat} />);
    default : return (
      <Text>Error</Text>
    )
  }
}




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
//}, )

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
