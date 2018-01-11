import React, { Component } from 'react';

import { AppRegistry, StyleSheet, Text, View , Image} from 'react-native';

class GreetingBlink extends Component {
  constructor(props){
    super(props);
    this.state = {showText:true}
    setInterval(()=>{
      this.setState(previousState=>{
        return {showText: !previousState.showText};
      });
    },1000);
  }

  render(){
    let display = this.state.showText ? this.props.name : '';
    return(
      <Text> Hello {display}!</Text>
    )
  }
}

class FixDimensionsBasics extends Component {
  render(){
    return (
      <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
        <View style={{width: 50, height: 50, backgroundColor:'powderblue'}}/>
        <View style={{width: 50, height: 50, backgroundColor:'skyblue'}}/>
        <View style={{width: 50, height: 50, backgroundColor:'steelblue'}}/>
      </View>
    )
  }
}

export default class HelloWorldApp extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <View style={styles.container}>
        <Text style={styles.red}>Open up App.jsddd to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <GreetingBlink name="Test2"></GreetingBlink>
        <Image source={pic} style={{width:193, height:110}}/>
        <FixDimensionsBasics/>
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject',()=>HelloWorldApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
