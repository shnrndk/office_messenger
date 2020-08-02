import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

export default function Intro({ navigation }) {
    return (
        <ScrollView>
            <View style={styles.imgContainer}>
                <Image style={styles.img} resizeMode='cover' source={require('../assets/splash.png')} />
            </View>
            <View style={styles.container}>

                <Text style={styles.txt}>Office Messenger</Text>
                <Text style={styles.txtDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at felis nec tellus lacinia hendrerit. </Text>
                <View style={styles.btnContainer}>
                    <Button style={styles.btnSignUp} mode="outlined" onPress={() => navigation.navigate('Sign Up')}>
                        Sign Up
                </Button>
                    <Button style={styles.btnLogin} mode="contained" onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: "white" }}>Login</Text>
                    </Button>
                </View>
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
    }
});