import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, View, TouchableOpacity,Image, Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import QuotesList from './components/QuotesList';
import SearchQuote from './components/SearchQuote';
import Settings from './components/Settings';

class App extends Component {


  render(){  
      return (
      <View style={styles.container}>
           <Home />
              <View style={styles.menuSettings}>
                <TouchableOpacity style={styles.quotesMenu} onPress={this.showQuotesList.bind(this)}>
                  <Image source={require('./images/ic_list.png')} style= {styles.quotesMenuImage}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quotesMenu} onPress={this.showSearch.bind(this)}>
                  <Image source={require('./images/ic_search.png')} style= {styles.searchMenuImage}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quotesMenu} onPress={this.showSettingsScreen.bind(this)}>
                  <Image source={require('./images/ic_options.png')} style= {styles.settingsMenuImage}/>
                </TouchableOpacity>
              </View>
       </View>
      );
}
  showQuotesList(){
    // const { navigate } = this.props;
    this.props.navigation.navigate('QuotesList');
  }
  showSearch(){
    this.props.navigation.navigate('SearchQuote');
  }

  showSettingsScreen(){
   this.props.navigation.navigate('Settings');
  }

  static navigationOptions = {
  // title: 'iQuotes',
  headerLeft:<Image source={require('./images/ic_launcher.png')} style= {{height: 30,
    width: 80, marginLeft:5}} resizeMode='contain'/>,
  headerStyle: {
      backgroundColor: '#fff',
    },
  headerTitleStyle: {
      color: 'black',
    },
  headerBackTitleStyle: {
      color: 'black',
    },
      headerTintColor: 'black',
};

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  menuSettings:{
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    position:'absolute',
    alignItems: 'center',
    borderTopWidth:2,
    borderTopColor:"#ededed",
    backgroundColor:'#fff',
    bottom:0,
    left:0,
    right:0,
  },
  quotesMenu:{
    alignItems:'center',
  },
  quotesMenuImage:{
    height: 50,
    width: 50
  },
  searchMenuImage:{
    height: 40,
    width: 40
  },
  settingsMenuImage:{
    height: 55,
    width: 55
  }

});


const iQuoteApp = StackNavigator({
  Home: { screen: App },
  QuotesList: { screen: QuotesList },
  SearchQuote: { screen: SearchQuote },
  Settings: { screen: Settings },
});

export default iQuoteApp;

