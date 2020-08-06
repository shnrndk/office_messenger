import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

export default function Intro({ navigation }) {
    return (
        <ScrollView>
            <View style={styles.imgContainer}>
                <Image style={styles.img} resizeMode='cover' source={require('../assets/office.png')} />
            </View>

            <View style={styles.container}>

                <Text style={styles.txt}>Office Messenger</Text>
                <Text style={styles.txtDescription}>Office Messenger helps office workers to interact with their co workers through messaging  </Text>
                <View style={styles.btnContainer}>
                    <Button style={styles.btnSignUp} mode="outlined" onPress={() => navigation.navigate('Sign Up')}>
                        Sign Up
                </Button>
                    <Button style={styles.btnLogin} mode="contained" onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: "white" }}>Login</Text>
                    </Button>
                </View>
                <Text style={styles.txt1}>Index No: 17000734</Text>
                <Text style={styles.txt1}>Name: Kalutarage S.R</Text>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    btnSignUp: {
        borderRadius: 30,
        borderColor: '#6b6dee',
        marginHorizontal: 15,
        paddingHorizontal: 25
    },
    btnLogin: {
        borderRadius: 30,
        marginHorizontal: 15,
        paddingHorizontal: 25,
    },
    txt: {
        marginBottom: 20,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#6b6dee',
    },
    txtDescription: {
        marginBottom: 20,
        color: '#737373',
        textAlign: 'center'
    },
    imgContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30
    },
    img: {
        width: 380,
        height: 300
    },
    txt1:{
        marginTop:5,
        marginBottom: 5,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#6b6dee',
    }
});