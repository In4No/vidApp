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
    console.log("here")
    this.state = {
      cam : false,
      captureOn : false,
      capturing : false
    }
  }

  showCam = () => {
    let camstate = this.state.cam
    let captureState = this.state.captureOn
    if(this.state.capturing){
      console.log("stopped capture")
      this.camera.stopCapture()
      this.setState({capturing : false})
    }
    if(this.state.captureOn){
      console.log("started capture")
      this.setState({capturing : true})
      const options = {};
      options.totalSeconds = 10
      this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
    }
    if(!camstate){
      this.setState({cam : true})
    }else{
      this.setState({captureOn : !captureState})
    }
  }

  takeBack = () => {
    this.setState({cam : false, captureOn : false})
  }

  getButtonStyle = () => {
    if(this.state.cam){
      if(this.state.captureOn){
        return styles.vidButtonStop
      }else{
        return styles.vidButtonLive
      }
    }else{
      return styles.vidButton
    }
  }

  uploadVid = () => {
    console.log("will upload")
    // run upload function
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
            <TouchableOpacity onPress={()=>this.showCam()} style={{width: width-40, height: 80, alignItems: 'center', justifyContent: 'center'}}><View style={this.getButtonStyle()}></View></TouchableOpacity>
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
        <View style={styles.camWrapper}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.cameraPreview} 
            aspect={Camera.constants.Aspect.fill} 
            type={"front"} 
            playSoundOnCapture={false} 
            captureMode={Camera.constants.CaptureMode.video} 
            totalSeconds={15} 
            >
          </Camera>
          <View style={styles.controlWrpr}>
            <TouchableOpacity onPress={()=>this.takeBack()} style={styles.backWrpr}>
              <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.showCam()} style={styles.recordWrpr}>
              <View style={this.getButtonStyle()}></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.uploadVid()} style={styles.backWrpr}>
              <Text style={styles.backText}>UPLOAD</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    justifyContent: 'center'
  },
  cameraPreview:{
    width: videoDimensions,
    height: videoDimensions,
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
  },
  vidButton:{
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'red'
  },
  vidButtonLive:{
    width: 42,
    height: 42,
    backgroundColor: 'red',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'red'
  },
  vidButtonStop:{
    width: 38,
    height: 38,
    backgroundColor: '#ffffff',
    borderWidth: 4,
    borderColor: 'red'
  },
  controlWrpr:{
    width: width - 40,
    height: 60,
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'space-between',
    borderColor: 'red',
    borderWidth: 1,
    marginTop: 100
  },
  backWrpr:{
    padding: 10,
    borderWidth: 1,
    borderColor: '#666666',
    marginBottom: 20
  },
  recordWrpr:{
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
