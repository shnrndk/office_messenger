// @flow
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';


function ManagementDept() {
  return (
    <View>
      <Button icon="camera" style={styles.btn} mode="contained" onPress={() => console.log('Pressed')}>
          Management Group
      </Button>
        <Button icon="camera" style={styles.btn} mode="contained" onPress={() => console.log('Pressed')}>
          HR Group
      </Button>
        <Button icon="camera" style={styles.btn} mode="contained" onPress={() => console.log('Pressed')}>
          Sales Group
      </Button>
      <Button icon="camera" style={styles.btn} mode="contained" onPress={() => console.log('Pressed')}>
          Accounting Group
      </Button>
    </View>
  )
}

function HrDept() {
  return (
    <View>
    <Button icon="camera" style={styles.btn} mode="contained" onPress={() => console.log('Pressed')}>
        HR Group
    </Button>
      <Button icon="camera" style={styles.btn} mode="contained" onPress={() => console.log('Pressed')}>
        HR group and Management Group
    </Button>
  </View>
  )
}

function SalesDept() {
  return (
    <View>
      <Button icon="camera" style={styles.btn} mode="contained" onPress={() => console.log('Pressed')}>
          Sales Group
      </Button>
        <Button icon="camera" style={styles.btn} mode="contained" onPress={() => console.log('Pressed')}>
          Sales Group with Management
      </Button>
    </View>
  )
}

function AccountingDep(){
  return (
    <View>
      <Button icon="camera" style={styles.btn} mode="contained" onPress={() => console.log('Pressed')}>
          Accounting Group
      </Button>
        <Button icon="camera" style={styles.btn} mode="contained" onPress={() => console.log('Pressed')}>
          Accouting Group with management
      </Button>
    </View>
  )
}


function SelectDept(){

  const [department, setDepartment] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem("department").then((value) => {
      setDepartment(value)
    })
  })

  switch(department){
    case 'Management':return (<ManagementDept />);
    case 'HR':return( <HrDept />);
    case 'Sales':return( <SalesDept />);
    case 'Accounting':return( <AccountingDep />);
    default : return (
      <Text>Error</Text>
    )
  }
}



function Home() {

  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

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
        <SelectDept />
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
