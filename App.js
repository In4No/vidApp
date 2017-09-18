import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import Camera from 'react-native-camera';
// import { Constants, Components } from 'expo';
// import { Video } from 'expo';


let width = Dimensions.get('window').width
let height = Dimensions.get('window').height
let videoDimensions = width - 40
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cam : false
    }
  }

  showCam = () => {
    this.setState({cam : !this.state.cam})
  }

  getInner = () => {
    if(!this.state.cam){
      return(
        <ScrollView horizontal={true} pagingEnabled={true}>
          <View style={styles.miniWrpr}>
            <View style={styles.videoContainer}>
              <Video
                source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                rate={1.0}
                volume={1.0}
                muted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{ width: videoDimensions, height: videoDimensions }}
              />
            </View>
            <Text style={styles.userName}>John Doe</Text>
            <TouchableOpacity onPress={()=>this.showCam()}><Text style={{color: '#666666' }}>Show Cam</Text></TouchableOpacity>
          </View>
          <View style={styles.miniWrpr}>
            <View style={styles.videoContainer}>
              <Video
                source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                rate={1.0}
                volume={1.0}
                muted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{ width: videoDimensions, height: videoDimensions }}
              />
            </View>
            <Text style={styles.userName}>Jane Doe</Text>
          </View>
          <View style={styles.miniWrpr}>
            <View style={styles.videoContainer}>
              <Video
                source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                rate={1.0}
                volume={1.0}
                muted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{ width: videoDimensions, height: videoDimensions }}
              />
            </View>
            <Text style={styles.userName}>Jim Doe</Text>
          </View>
        </ScrollView>
      )
    }else{
      return(
        <View style={styles.camWrapper}></View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.getInner()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  camWrapper:{
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'red'
  },
  miniWrpr:{
    padding: 20,
    width: width, 
    borderWidth: 1,
    borderColor: '#eaeaea'
  },
  videoContainer:{
    width: videoDimensions,
    height: videoDimensions,
    backgroundColor: '#000000',
    marginTop: 25
  },
  userName:{
    fontSize: 40,
    color: '#666666'
  }
});
