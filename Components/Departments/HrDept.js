import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';


export default function HrDept(props) {
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
  