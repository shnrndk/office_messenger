import React, { useEffect, useState } from 'react';
import { StyleSheet,Text } from 'react-native';
import { AsyncStorage } from 'react-native';
import ManagementDept from './ManagementDept';
import SalesDept from './SalesDept';
import AccountingDep from './AccountingDept';
import HrDept from './HrDept';
import { ActivityIndicator } from 'react-native-paper';

export default function SelectDept(props){

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
        <React.Fragment>
          <ActivityIndicator animating={true} size={"large"}/>
          <Text style={{textAlign:"center",fontSize:18,color:'#6b6dee',fontWeight:'bold'}}>Please Logout And Sign In again</Text>
        </React.Fragment>
        
      )
    }
  }
  
  

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
  