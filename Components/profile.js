import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, Picker, ScrollView, SafeAreaView, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AsyncStorage } from 'react-native';
import { Appbar } from 'react-native-paper';

const registerSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  first_name: yup.string().required('First Name is Required'),
})

export default class Profile extends React.Component {


  state = {
    image: null,
    imageURL: null,
    email: null,
    dept: null,
    username: null
  };



  render() {
    let { image } = this.state;

    return (

      <React.Fragment>
        <Appbar.Header>
          <Appbar.Action icon="menu" onPress={() => { this.props.navigation.openDrawer(); }} />
          <Appbar.Content title="Change Avator" />

        </Appbar.Header>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 100 }} />}

          <Button style={styles.btn} mode="contained" onPress={this._pickImage}>
            <Text style={{ color: "white" }}>Change Avator</Text>
          </Button>
          <Text style={styles.txtinfo}>NAME: {this.state.username}</Text>
          <Text style={styles.txtinfo}>EMAIL: {this.state.email}</Text>
          <Text style={styles.txtinfo}>DEPARTMENT: {this.state.dept}</Text>

        </View>

      </React.Fragment>




    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    AsyncStorage.getItem("email").then((value) => {
      this.setState({
        ...this.state, email: value
      })
    })
    AsyncStorage.getItem("department").then((value) => {
      this.setState({
        ...this.state, dept: value
      })
    })
    AsyncStorage.getItem("username").then((value) => {
      this.setState({
        ...this.state, username: value
      })
    })
    AsyncStorage.getItem("avator").then((value) => {
      this.setState({
        ...this.state, image: value
      })
    })
  }

  /* getusername(){
    async function storeUser() {
      try {
        const usrname =  AsyncStorage.getItem('username')
      } catch (e) {
        console.log(e)
      }
    }
    storeUser();
  } */

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };



  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });

        this.uploadImage(result.uri)
          .then((res) => {
            alert("Success");
          }).catch((error) => {
            alert(error);
          })
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageId = new Date().getTime().toString();
    //var ref = firebase.storage().ref().child("Avators/"+imageName);
    const uploadTask = firebase.storage().ref(`images/${imageId}`).put(blob)
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        //setProgress(progress);
        console.log(progress)
      },
      error => {
        console.log(error);
      },
      () => {
        firebase.storage()
          .ref("images")
          .child(`${imageId}`)
          .getDownloadURL()
          .then(url => {
            this.setState({
              ...this.state, imageURL: url
            })
            console.log(this.state.imageURL)
            async function storeNewAvator() {
              try {
                const avator = AsyncStorage.setItem('avator', url)
              } catch (e) {
                console.log(e)
              }
            }
            storeNewAvator();


            firebase.database().ref('users').on('value', (snapshot) => {
              var users = snapshot.val();

              const tempUser = [];

              for (let key in users) {
                if (users[key]['email'] === this.state.email) {
                  /* await AsyncStorage.setItem('username', users[key].first_name)
                  await AsyncStorage.setItem('email', users[key].email)
                  await AsyncStorage.setItem('department', users[key].dept) */
                  console.log(key)
                  //firebase.database().ref('users').child(`${key}`).push({ avator: this.state.imageURL })

                  /*  firebase.database().ref('Farmers/').child(`${uid}`).child('reviews').child(`${timestamp}`).set({
                     ...state, id: timestamp
                 }).then((res) => {
                     console.log("Success")
                 }).catch((error) => {
                     console.log(error)
                 }) */
                  firebase.database().ref('users/').child(`${key}`).set({
                    dept: this.state.dept,
                    email: this.state.email,
                    first_name: this.state.username,
                    avator: this.state.imageURL
                  }).then((res) => {
                    console.log("Success")
                  }).catch((error) => {
                    console.log(error)
                  })
                  break;
                }
              }


            }

            )


          })
      }
    )
    return uploadTask;
  }
}





const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 15,
    marginTop: 6,
  },
  textInputTop: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  btn: {
    marginTop: 20,
    marginHorizontal: 80,
    paddingVertical: 6,
    marginBottom: 30,
    borderRadius: 30
  },
  txtinfo: {
    marginTop: 12,
    fontSize: 23,
    fontWeight: 'bold',
    color: '#6b6dee',
    marginHorizontal: 15,
  },
  errorMsg: {
    color: 'red',
    marginHorizontal: 15,
  },
  pickerContainer: {
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  depText: {

    color: "grey",
    fontSize: 17,
    marginHorizontal: 40,
    marginVertical: 10,
  }
})