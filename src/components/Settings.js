import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Share, Linking
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Overlay from 'react-native-modal-overlay';

export default class Settings extends Component {

constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
}
render() {
  const modalVisible = this.state.modalVisible
    return (
     <View style={styles.container}>
            <TouchableOpacity style={styles.settingsRow} onPress={this.share}>
              <Text style={styles.SettingsTitleText}>Tell a friend</Text>
              <Text>Share this app with friends</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.settingsRow} onPress={this.rate}>
              <Text style={styles.SettingsTitleText}>Rate us</Text>
              <Text>Like the app? Support us</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.settingsRow} onPress={this.feedback}>
              <Text style={styles.SettingsTitleText}>Feedback</Text>
              <Text>Contact the developer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingsRow} onPress={this.about.bind(this)}>
              <Text style={styles.SettingsTitleText}>About</Text>
            </TouchableOpacity>
            <Overlay visible={modalVisible}
                  closeOnTouchOutside animationType="fade"
                  containerStyle={{backgroundColor: 'rgba(52, 52, 52, 0.8)'}}
                  childrenWrapperStyle={{backgroundColor: '#fff'}} >
                <Image source={require('../images/ic_launcher.png')} style= {{height: 60,
                                width: 100, marginLeft:5}}/>
                <Text style={{marginTop: 10, }}>Version 1.1 © Appzia 2017</Text>
                <Text style={{marginTop: 10, fontSize: 14}}>This app was built with FaceBook React Native.</Text>
            </Overlay>
    </View>
    );
  }
share(){
 Share.share({
      message: 'Checkout these amazing quotes https://play.google.com/store/apps/details?id=com.iquote',
    }, {
      dialogTitle: 'Share with:',
    })
    .then(this._showResult)
    .catch(err => console.log(err))
}
rate(){
  let url='https://play.google.com/store/apps/details?id=com.iquote';
  Linking.canOpenURL(url).then(supported => {
  if (!supported) {
    console.log('Can\'t handle url: ' + url);
  } else {
    return Linking.openURL(url);
  }
  }).catch(err => console.error('An error occurred', err));
}
feedback(){
 let url='mailto:stevekamau72@gmail.com?subject=Feedback on iQuote&body=';
 // alert(url);
 // Linking.openURL(url);
  Linking.canOpenURL(url).then(supported => {
  if (!supported) {
    alert('Can\'t handle url: ' + url)
    console.log('Can\'t handle url: ' + url);
  } else {
    return Linking.openURL(url);
  }
}).catch(err => console.error('An error occurred', err));
}
about(){
  this.setState({
            modalVisible: true
    });
}

static navigationOptions = ({ navigation }) => {
  return {
      title: 'Settings',
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
};

}


const styles = StyleSheet.create({
  container:{
    flex:1,
    borderTopWidth:7, 
    borderColor:'#ddd',

  },
  settingsRow:{
    justifyContent:'center', 
    padding:10, 
    borderBottomWidth:1, 
    borderColor:'#ddd',
    backgroundColor: '#fff'
  },
  SettingsTitleText:{
    fontSize: 16,
    color: '#000'
  },
});