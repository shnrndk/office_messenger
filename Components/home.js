const { disableExpoCliLogging } = require("expo/build/logs/Logs")
import * as firebase from 'firebase';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function Home() {
    return (
        <View>
            <Button mode="contained" color="#841584" style={styles.btntrig} onPress={() => { firebase.auth().signOut() }}>Logout</Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {

    }
})