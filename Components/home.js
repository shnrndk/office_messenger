const { disableExpoCliLogging } = require("expo/build/logs/Logs")
import * as firebase from 'firebase';
import React, { useState,useEffect,useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { GiftedChat } from 'react-native-gifted-chat'

function getuser(){
  return (firebase.auth().currentUser || {}).uid;
}


export default function Home() {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ])
      }, [])

      const onSend = useCallback(async (messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        

        let msg = {
            txt:messages[0]['text'],
            user:await getuser(),
            timestamp:firebase.database.ServerValue.TIMESTAMP
        }
        
        
        firebase.database().ref('messages').push(msg)
      }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: getuser(),
            }}
        />
    )
}


const styles = StyleSheet.create({
    container: {

    }
})