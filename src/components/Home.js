import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Dimensions, ScrollView, Share, ActivityIndicator
} from 'react-native';

import { StackNavigator } from 'react-navigation';

class Home extends React.Component {

  state = {
      animating: true,
      data: [],
      author: [],
      tags:[],
      image_url: 'https://unsplash.it/'+this.getRandomInt(6, 12)*100+'/'+this.getRandomInt(3, 10)*100+'/?random'

   }

  componentDidMount = () => {
      fetch('https://favqs.com/api/qotd', {
         method: 'GET'
      })
    
      .then((response)  =>  response.json())
      .then((responseJson)  =>  {
         console.log(responseJson);
         // alert(JSON.stringify(data));
         // alert(JSON.stringify(responseJson.quote.body))
         this.setState({
          // data: JSON.stringify(responseJson.contents.quotes)
            // data: responseJson
            animating: false,
            data: responseJson.quote.body,
            author: responseJson.quote.author,
            tags: responseJson.quote.tags
            // image_url: 'https://unsplash.it/'.getRandomInt(600, 1000).'/'.getRandomInt(400, 600).'/?random'
            // this.state.data.map(function(quotes, i)
         })
         
// let quotes = responseJson.contents.quotes.map(function(quote) {
//   return {
//     message: quote.quote
//   };
//   alert(message);
// });
      
      })
    
      .catch((error)  =>  {
         console.error(error);
      });


   }

  render() {
    //const { params } = this.props.navigation.state;
    //console.log(params);
    const animating = this.state.animating
    const dimensions = Dimensions.get('window');
    const imageHeight = Math.round(dimensions.width * 9 / 16);
    const imageWidth = dimensions.width;
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
            <Text style={styles.quoteOfTheDayTitle}>QUOTE OF THE DAY</Text>
            <View style={styles.loadingView}>
                <Image style={{ height: imageHeight, width: imageWidth , flexGrow:1, alignItems: 'center',
                justifyContent:'center',}} 
                source={{uri: this.state.image_url}}>
                     <ActivityIndicator
                       animating = {animating}
                       color = '#ccc'
                       size = "large"
                       style = {styles.activityIndicator}/>
                  </Image>
            </View>
            <Text style={styles.quoteOfTheDayCategory}>tags: {this.state.tags}</Text>
            <Text style={styles.quoteOfTheDayMessage}>{this.state.data}</Text>
            <Text style={styles.quoteOfTheDayAuthor}>- {this.state.author}</Text>
            <View>
                <TouchableOpacity style={styles.shareContainer} onPress={this.shareQuote.bind(this)}>
                  <Text style={styles.shareText}>Share</Text>
                  <Image source={require('../images/ic_share.png')} style= {styles.shareImage}/>
                </TouchableOpacity>
            </View>
            <View style={{ height: 50, width: 50 }}/>
        </View>
    </ScrollView>
    );
  }
  
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
  getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shareQuote(){
     Share.share({
      message: this.state.data+'\n- '+this.state.author,
    }, {
      dialogTitle: 'Share Quote',
    })
    .then(this._showResult)
    .catch(err => console.log(err))
  }
}


const styles = StyleSheet.create({
  scrollView:{
    marginBottom:50
  },
  loadingView:{
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
   },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  quoteOfTheDayTitle:{
    fontSize: 18,
    color: '#212121',
    marginBottom: 30,
    marginTop:10
  },
  quoteOfTheDayCategory:{
    fontSize: 15,
    color: '#F97300',
    marginBottom: 20,
    marginTop:20
  },
  quoteOfTheDayMessage:{ 
    fontSize: 16,
    color: '#343434',
    paddingLeft:20,
    paddingRight:20,
    marginBottom: 20,
    textAlign: 'center'
  },
  quoteOfTheDayAuthor:{
    fontSize: 15,
    color: '#616161',
    paddingLeft:20,
    paddingRight:20,
    marginBottom: 20,
    textAlign: 'center'
  },
  shareContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center', 
    borderRadius: 25,
    borderWidth:1,
    borderColor:'#ccc',
    width:100, 
    height:50,
  },
  shareText:{
    fontSize: 15,
    marginLeft:10,
    color: '#000',
    fontWeight:'bold', 
  },
  shareImage:{
    height: 40,
    width: 40,
  },
});


export default Home