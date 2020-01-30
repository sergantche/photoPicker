import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button, Content } from 'native-base';
import ImagePicker from 'react-native-image-picker';

const deedDescription = 'deed description deed description deed description deed description deed description deed deed deed description'

class App extends React.Component {
  state={
    imageBefore: '',
    imageAfter: ''
  }
  constructor(props) {
    super(props);
  }

  // If it's called with 0 then update imageBefore, if with 1 then imageAfter
  onPress = (photoIdx) => {
    // More info on all the options is below in the API Reference...
    // just some common use cases shown here
    // https://github.com/react-native-community/react-native-image-picker
    const options = {
      title: 'Choose Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // Launch ImagePicker
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.data) {
        // Try to send base64 image in firestore
        // SEND DATA...

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        if (photoIdx == 0) {
          this.setState({ imageBefore: response.data });
        } else if (photoIdx == 1) {
          this.setState({ imageAfter: response.data });
        }
      }
    });
  }

  render() {
    return (
      <Content style={ styles.mainContainer }>
        {/* DEED DESCRIPTION */}
        <View style={ styles.container }>
          <Text style={{ fontSize: 24 }}>{ 'Deed Title' }</Text>
          <View style={ styles.descriptionContainer }>
            <Text style={{ fontSize: 16 }}>{ deedDescription }</Text>
          </View>
        </View>

        {/* UPLOAD IMAGE BEFORE */}
        <View style={ styles.container}>
          <Text style={ styles.textShortTitles }>{ 'Before' }</Text>
          {this.state.imageBefore != '' &&
            <Image
              resizeMode='cover'
              style={ styles.imageContainer }
              source={{ uri: 'data:image/jpeg;base64,' + this.state.imageBefore }}>
            </Image>
          }
          <Button style={ styles.button } onPress={ ()=>{ this.onPress(0) }}>
            <Text style={ styles.textButton }>{ 'Upload Image' }</Text>
          </Button>
        </View>

        {/* UPLOAD IMAGE AFTER */}
        <View style={[ styles.container, { marginBottom: 30 }]}>
          <Text style={ styles.textShortTitles }>{ 'After' }</Text>
          {this.state.imageAfter != '' &&
            <Image
              resizeMode='cover'
              style={ styles.imageContainer }
              source={{ uri: 'data:image/jpeg;base64,' + this.state.imageAfter }}>
            </Image>
          }
          <Button style={ styles.button } onPress={ ()=>{ this.onPress(1) }}>
            <Text style={ styles.textButton }>{ 'Upload Image' }</Text>
          </Button>
        </View>
      </Content>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 5
  },
  container: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    paddingHorizontal: 5,
    paddingTop: 20
  },
  descriptionContainer: {
    padding: 12,
    paddingVertical: 16
  },
  textShortTitles: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginLeft: 10
  },
  imageContainer: {
    width: 200,
    height: 160,
    alignSelf: 'center',
    margin: 10,
    borderRadius: 5
  },
  button: {
    width: 150,
    height: 50,
    margin: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  textButton: {
    color: 'white',
    fontSize: 18
  }
});

export default App;
