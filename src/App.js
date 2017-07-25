import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, View, TouchableOpacity,Image, Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './components/Home';
import QuotesList from './components/QuotesList';
import SearchQuote from './components/SearchQuote';

class App extends Component {
	static navigationOptions = {
  headerLeft:<Image source={require('./images/ic_launcher.png')} style= {{height: 50,
    width: 85, marginLeft:5}}/>,
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

  constructor() {
    super();
    // this.state = {
    //   loginVisible: true
    // }
  }

  // componentWillMount(){
  //   //Check if userData is stored on device else open Login
  //   AsyncStorage.getItem('userData').then((user_data_json) => {
  //     let user_data = JSON.parse(user_data_json);
  //      console.log(36, user_data);
  //     if(user_data != null){
  //       this.setState({loginVisible:false});
  //     }else{
  //        this.setState({loginVisible:true});
  //     }
  //   });
 
  // }

  render(){  
      return (
      <View style={styles.container}>
           <Home />
              <View style={styles.menuOptions}>
                <TouchableOpacity style={styles.quotesMenu} onPress={this.showQuotesList.bind(this)}>
                  <Image source={require('./images/ic_list.png')} style= {styles.quotesMenuImage}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quotesMenu} onPress={this.showSearch.bind(this)}>
                  <Image source={require('./images/ic_search.png')} style= {styles.searchMenuImage}/>
                </TouchableOpacity>
              </View>
       </View>
       // <Home onMenuOptonSelected={this._onMenuOptonSelected.bind(this)}/>
      );
    
 //    if (this.state.loginVisible) {
 //    	console.log('visible')
 //    	return (

 //            <Modal visible={this.state.loginVisible}
 //                   onRequestClose={function() {}}>
 //           			<Login navigation={ navigate} onClose={this._onCloseLogin.bind(this)}/>   
 //     	    </Modal>
 //          );
			
	// } else {
	// 	return (
	// 		<ChatRooms onRoomSelected={this._onRoomSelected.bind(this)}/>
	// 	  );
	// }

  }
	// _onRoomSelected(row) {
	// 	this.props.navigation.navigate('ChatList',{ rowuser: 'Lucy' })
	//     // alert("Selected User:\n" + JSON.stringify(user))
	// }
  showQuotesList(){
    // const { navigate } = this.props;
    this.props.navigation.navigate('QuotesList');
  }
  showSearch(){
    this.props.navigation.navigate('SearchQuote');
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  menuOptions:{
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

});


const iQuoteApp = StackNavigator({
  Home: { screen: App },
  QuotesList: { screen: QuotesList },
  SearchQuote: { screen: SearchQuote },
});

export default iQuoteApp;

