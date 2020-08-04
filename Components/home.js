// @flow
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { AsyncStorage } from 'react-native';
import Fire from '../firebase';

class Home extends React.Component {

   getuserName = async()=> {

    try {
        const username = await AsyncStorage.getItem('username');
        return username
    } catch (e) {
        console.log(e)
    }
  }

  state = {
    messages: [],
    username:null
  };

  get user() {
    return {
      name: this.state.username,
      _id: Fire.shared.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
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
 

    Fire.shared.on(message =>
      {console.log(message)
      this.setState(previousState => ({
        ...this.state,
        messages: GiftedChat.append(previousState.messages, message),
      }))}
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
}

export default Home;
