// @flow
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import Fire from '../firebase';

class Chat extends React.Component {

  getuserName = async () => {

    try {
      const username = await AsyncStorage.getItem('username');
      return username
    } catch (e) {
      console.log(e)
    }
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const createdAt = new Date(numberStamp);
    const message = {
      _id,
      createdAt,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }

  state = {
    messages: [],
    username: null
  };

  get user() {
    return {
      name: this.state.username,
      _id: this.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.send}
        user={this.user}
      />
    );
  }

  componentDidMount() {
    AsyncStorage.getItem("username").then((value) => {
      this.setState({
        ...this.state,
        username: value
      });
    })


    this.on(message =>

      this.setState(previousState => ({
        ...this.state,
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    this.off();
  }
}

export default Chat;
