import React, { Component } from 'react';

import { AppRegistry, StyleSheet, ScrollView, Text, View , Image, TextInput, Alert, Button, SectionList, ListView, ActivityIndicator} from 'react-native';

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

class PizzaTranslator extends Component{
  constructor(props){
   super(props);
   this.state = {text:''}; 
  }
  render(){
    return(
      <View style={{padding:10, width:400}}>
        <TextInput style={{height:40}} 
        placeholder="Type here to translate"
        onChangeText={(text)=> this.setState({text})}/>
        <Text style={{padding:10,fontSize:42}}>
        {this.state.text.split(' ').map((word)=> word &&'🍕').join(' ')}
        </Text>
      </View>
    );
  }  
}

class ButtonBasics extends Component{
  _onPressButton(){
    Alert.alert("button tapped");
  }
  render(){
    return(
      <Button onPress={this._onPressButton} title="OKi" color="#841584" />
    )
  }
}
class MovieList extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading:true
    }
  }
  componentDidMount(){
    return getMovisFromApi().then((response)=>{
      let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1!==r2});
      this.setState({
        isLoading:false,
        dataSource: ds.cloneWithRows(response),
        function(){
          //do something with new state
        }
      });
    })
    .catch((error)=>{
      console.error(error);
    });
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex:1, paddingTop:20}}>
        <ActivityIndicator/>
        </View>
      );
    }
    return(
      <View >
        <ListView
        dataSource = {this.state.dataSource}
      renderRow = {(item)=> <Text style={styles.item}>Item:{item.title}</Text>}
        />
      </View>
    );
  }
}


export default class HelloWorldApp extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <View contentContainerStyle={styles.container}>
        <Text style={styles.red}>Open up App.jsddd to start working on your app!</Text>
        <Text style={{fontSize:50}} >Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <GreetingBlink name="Test2"></GreetingBlink>
        <Image source={pic} style={{width:193, height:110}}/>
        <PizzaTranslator />
        <MovieList/>
        <FixDimensionsBasics/>
        <ButtonBasics/>
        <PizzaTranslator/>
        <Image source={pic} style={{width:193, height:110}}/>
        <Image source={pic} style={{width:193, height:110}}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject',()=>HelloWorldApp);

const styles = StyleSheet.create({
  container: {
    //flex: 1,
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

async function getMovisFromApi(){
  try {
    let response = await fetch('https://facebook.github.io/react-native/movies.json');
    let responseJson =  await response.json();
    return responseJson.movies;
  } catch (error) {
    console.error(error);
  }

}
