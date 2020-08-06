// @flow
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import Fire from '../firebase';
import { Appbar } from 'react-native-paper';

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
    return firebase.database().ref(`${this.props.route.params.groupName}`);
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
    username: null,
    groupName: null
  };

  get user() {
    return {
      name: this.state.username,
      _id: this.uid,
    };
  }
  _goBack = () => this.props.navigation.goBack();




  render() {
    return (
      <React.Fragment>
        <Appbar.Header>
          <Appbar.BackAction onPress={this._goBack} />
          <Appbar.Content title={this.state.groupName} subtitle="Group Chat" />
        </Appbar.Header>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.send}
          user={this.user}
        />
      </React.Fragment>
    );
  }

  componentDidMount() {
    console.log(this.props.route.params.groupName)
    AsyncStorage.getItem("username").then((value) => {
      this.setState({
        ...this.state,
        username: value
      });
    })

    switch (this.props.route.params.groupName) {
      case 'Management':
        this.setState({ ...this.state, groupName: 'Management' })
        break;
      case 'Management_HR':
        this.setState({ ...this.state, groupName: 'Management and HR' });
        break;
      case 'Management_Sales':
        this.setState({ ...this.state, groupName: 'Management and Sales' });
        break;
      case 'Management_Accounting':
        this.setState({ ...this.state, groupName: 'Management and Accounting' });
        break;
      case 'Sales':
        this.setState({ ...this.state, groupName: 'Sales' });
        break;
      case 'HR':
        this.setState({ ...this.state, groupName: 'HR' });
        break;
      case 'Accounting':
        this.setState({ ...this.state, groupName: 'Accounting' });
        break;
      default: console.log('Waiting Or Error')
    }


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
