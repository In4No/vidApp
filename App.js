import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, TextInput } from 'react-native';
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
      capturing : false,
      text : 'Enter Message'
    }
  }

  getRecStyle = () => {
    if(this.state.captureOn){
      return styles.camRecording
    }
  }

  getRecText = () => {
    if(this.state.captureOn){
      return(
        <View style={styles.recTextWrpr}>
          <Text style={styles.recText}>REC</Text>
        </View>
      )
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
      this.setState({captureOn : true})
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

  sendMessage = () => {
    console.log("will send message")
  }


  getInner = () => {
    if(!this.state.cam){
      return(
        <ScrollView horizontal={true} pagingEnabled={true}>
          <View style={styles.miniWrpr}>
            <ScrollView style={{paddingBottom: 40}} showsVerticalScrollIndicator={false}>
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
              <View style={styles.otherDetailWrpr}>
                <Text style={styles.userName}>John Doe, 26y, BLR</Text>
              </View>
              <View style={[styles.controlWrpr, {borderWidth: 1, borderColor: 'transparent', borderTopColor: '#eaeaea', marginTop: 10, marginBottom: 0}]}>
                <TouchableOpacity onPress={()=>this.showCam()} style={styles.recordWrpr}>
                  <View style={this.getButtonStyle()}></View>
                  </TouchableOpacity>
              </View>
              <View style={styles.userDetailsWrpr}>
                <Text style={styles.runningText}>
                  Hello, I am lorem ipsum dolor sit amet. 
                  this is my brief bio. To know more, click 
                  on record. lorem ipsum dolor sit amet. 
                  lorem ipsum. dolor sit amet. lorem ipsum. 
                  lorem ipsum dolor sit amet. lorem ipsum.
                  lorem ipsum dolor sit amet. lorem ipsum.
                  lorem ipsum dolor sit amet. lorem ipsum.
                </Text>
              </View>
            </ScrollView>
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
          <View style={this.getRecStyle()}></View>
          {this.getRecText()}
          <View style={styles.controlWrpr}>
            <TouchableOpacity onPress={()=>this.takeBack()} style={styles.backWrpr}>
              <Text style={styles.backText}>BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.showCam()} style={styles.recordWrpr}>
              <View style={this.getButtonStyle()}></View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.uploadVid()} style={styles.uploadWrpr}>
              <Text style={styles.backText}>UPLOAD</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputWrpr}>
            <TextInput style={{height: 50, borderColor: 'transparent', borderWidth: 1, width: width - 40, fontSize: 20}} onChangeText={(text) => this.setState({text})} value={this.state.text} />
          </View>
          <TouchableOpacity onPress={()=>this.sendMessage()}>
            <View style={styles.sendWrpr}>
              <Text style={styles.sendText}>SEND</Text>
            </View>
          </TouchableOpacity>
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
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width,
    height: height
  },
  camWrapper:{
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  camRecording:{
    position: 'absolute',
    top: 14,
    right: 54,
    width: 14,
    height: 14,
    backgroundColor: 'red',
    borderRadius: 7
  },
  recTextWrpr:{
    position: 'absolute',
    top: 10,
    right: 20
  },
  recText:{
    color: 'red',
    fontSize: 18
  },
  cameraPreview:{
    width: videoDimensions,
    height: videoDimensions,
  },
  miniWrpr:{
    padding: 20,
    width: width,
    height: height,
  },
  videoContainer:{
    width: videoDimensions,
    height: videoDimensions,
    backgroundColor: '#000000',
    marginTop: 25
  },
  otherDetailWrpr:{
    width: width - 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  userName:{
    fontSize: 30,
    color: '#666666',
    lineHeight: 46
  },
  runningText:{
    fontSize: 26,
    color: '#888888',
    lineHeight: 36
  },
  userDetailsWrpr:{
    width: width - 40,
    paddingTop :0,
    paddingBottom: 30
  },
  vidButton:{
    width: 40,
    height: 40,
    backgroundColor: '#eaeaea',
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
    backgroundColor: '#eaeaea',
    borderWidth: 4,
    borderColor: 'red'
  },
  controlWrpr:{
    width: width - 40,
    height: 60,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    position: 'relative'
  },
  backWrpr:{
    padding: 10,
    borderWidth: 1,
    borderColor: '#666666',
    marginBottom: 20,
    position: 'absolute',
    left: 0,
    top: 10,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadWrpr:{
    padding: 10,
    borderWidth: 1,
    borderColor: '#666666',
    marginBottom: 20,
    position: 'absolute',
    right: 0,
    top: 10,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  recordWrpr:{
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputWrpr:{
    width: width - 40
  },
  sendWrpr:{
    width: width - 40,
    height: 40,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30
  },
  sendText:{
    color: '#ffffff'
  },
});
