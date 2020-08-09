import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { IconButton, Colors } from 'react-native-paper';
import * as firebase from 'firebase';

export default class ImgPicker extends React.Component {
  state = {
    image: null,
    imageURL:null
  };

 /*  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View> */

  render() {
    let { image } = this.state;

    return (
      <IconButton
      icon="camera"
      color={Colors.red500}
      size={20}
      onPress={this._pickImage}
    />
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }
  

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
          console.log("Success")
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
            this.props.setmsgImgUrl(url)
          })
      }
    )
    return uploadTask;
  }
}