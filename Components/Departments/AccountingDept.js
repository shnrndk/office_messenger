import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';


export default function AccountingDep(props){
  return (
    <View>
      <Button icon="account-group" style={styles.btn} mode="contained" onPress={() => props.goToChat('Accounting')}>
          Accounting Group
      </Button>
        <Button icon="account-group" style={styles.btn} mode="contained" onPress={() => props.goToChat('Management_Accounting')}>
          Accouting Group with management
      </Button>
    </View>
  )
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
  