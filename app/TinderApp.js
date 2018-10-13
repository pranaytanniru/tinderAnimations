/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  PanResponder
} from 'react-native';
const SCREEN_HEIGHT= Dimensions.get('window').height
const SCREEN_WIDTH= Dimensions.get('window').width
const Images=[
  {id:"1",uri:require('./assets/1.jpg')},
  {id:"2",uri:require('./assets/2.jpg')},
  {id:"3",uri:require('./assets/3.jpg')},
  {id:"4",uri:require('./assets/4.jpg')},
  {id:"5",uri:require('./assets/5.jpg')},
]
export default class TinderApp extends Component {

  constructor(){
    super()
    this.position=new Animated.ValueXY()
    this.state={
      currentIndex:0
    }
    this.rotate=this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:['-10deg','0deg','10deg'],
      extrapolate:'clamp'
    })
    this.rotateAndTranslate={
      transform:[{
        rotate:this.rotate
        },
        ...this.position.getTranslateTransform()
      ]
    }
    this.likeOpacity=this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:[0,0,1],
      extrapolate:'clamp'
    })
    this.dislikeOpacity=this.position.x.interpolate({
      inputRange:[-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:[1,0,0],
      extrapolate:'clamp'
    })
  }
  componentWillMount(){
    this.PanResponder=PanResponder.create({
      onStartShouldSetPanResponder:(evt,gestureState)=>true,
      onPanResponderMove:(evt,gestureState)=>{
        this.position.setValue({x:gestureState.dx,y:gestureState.dy})
      },
      onPanResponderRelease:(evt,gestureState)=>{

      }
    })
  }

  _renderImages(){
    return Images.map((image,index)=>{
      if(index===this.state.currentIndex){
        return(
          <Animated.View
          {...this.PanResponder.panHandlers}
           key={index}
           style={[this.rotateAndTranslate,{height:SCREEN_HEIGHT-120,width:SCREEN_WIDTH,padding:10,position:'absolute'}]}>
            <Animated.View style={{opacity:this.likeOpacity,transform:[{rotate:'-30deg'}],position:'absolute',top:50,left:40,zIndex:1000}}>
              <Text style={{borderWidth:1,borderColor:'green',color:'green',fontSize:32,fontWeight:'800',padding:10}}>AWESOME</Text>
            </Animated.View>
            <Image
            style={{flex:1,height:null,width:null,resizeMode:'cover',borderRadius:20}}
            source={image.uri}/>
            <Animated.View style={{opacity:this.dislikeOpacity,transform:[{rotate:'30deg'}],position:'absolute',top:50,right:40,zIndex:1000}}>
              <Text style={{borderWidth:1,borderColor:'red',color:'red',fontSize:32,fontWeight:'800',padding:10}}>NOPE</Text>
            </Animated.View>
          </Animated.View>
        );
      }else{
        return(
          <Animated.View
           key={index}
           style={{height:SCREEN_HEIGHT-120,width:SCREEN_WIDTH,padding:10,position:'absolute'}}>
            <Image
            style={{flex:1,height:null,width:null,resizeMode:'cover',borderRadius:20}}
            source={image.uri}/>
          </Animated.View>
        );
      }
    }).reverse()
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{height:60}}>

        </View>
        <View style={{flex:1}}>
          {this._renderImages()}
        </View>
        <View style={{height:60}}>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
