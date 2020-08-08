// @flow
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { AsyncStorage } from 'react-native';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,Image
} from "react-native";
import firebase from 'firebase';
import Fire from '../firebase';
import { Appbar } from 'react-native-paper';
import { bool } from 'yup';

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
    const { timestamp: numberStamp, text, user, sent } = snapshot.val();
    const { key: _id } = snapshot;
    const createdAt = new Date(numberStamp);
    const message = {
      _id,
      createdAt,
      text,
      user,
      sent
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
        sent: true,
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
    groupName: null,
    avator: null,
    tempAvator:false,
    modalVisible: false,
    tempname:null
  };

  setModalVisible = (visible) => {
    this.setState({ ...this.state,modalVisible: visible });
  }

  get user() {
    if (this.state.avator === null) {
      return {
        name: this.state.username,
        _id: this.uid,
      };
    } else {
      return {
        name: this.state.username,
        _id: this.uid,
        avatar: this.state.avator
      };
    }

  }


  _goBack = () => this.props.navigation.goBack();

  render() {
    const { modalVisible } = this.state;
    return (
      <React.Fragment>
        <Appbar.Header>
          <Appbar.BackAction onPress={this._goBack} />
          <Appbar.Content title={this.state.groupName} subtitle="Group Chat" />
        </Appbar.Header>
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
            <Image source={{ uri: this.state.tempAvator }} style={{ width: 200, height: 200, borderRadius: 100 }} />
        <Text style={{fontSize:20,marginBottom:10}}>Name:{this.state.tempname}</Text>
              
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        
        <GiftedChat
          messages={this.state.messages}
          onSend={this.send}
          user={this.user}
          showAvatarForEveryMessage={true}
          onPressAvatar={async (user) => {
            
              await this.setState({
                ...this.state,tempAvator:user.avatar,tempname:user.name
              })
           
              
              
            console.log(user)
            this.setModalVisible(true)}
          }

          showUserAvatar={true}
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

    AsyncStorage.getItem("avator").then((value) => {
      this.setState({
        ...this.state, avator: value
      })
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});