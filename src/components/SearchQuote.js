import React, { Component } from 'react';
import { StyleSheet, ListView, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator, Share
} from 'react-native';
import { StackNavigator } from 'react-navigation';

const responseJson = [];

export default class QuotesList extends Component {

constructor(props) {
    super(props);
    this.state = {
      animating: false,
      searchQuery:'',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  }

componentDidMount = () => {
     this.searchQuoteRequest();
   }
searchQuoteRequest(){
   this.setState({animating: true,});
   fetch('https://favqs.com/api/quotes/?filter='+this.state.searchQuery, {
         method: 'GET',
          headers: {
          'Authorization': 'Token token="2b678d4d01ad191677e491df4ab2b506"'
         }, 
      })
    
      .then((response)  =>  response.json())
      .then((responseJson)  =>  {
        console.log(responseJson);
        //alert(JSON.stringify(responseJson));
      this.setState({
             dataSource: this.state.dataSource.cloneWithRows(responseJson.quotes),
             animating: false,
    });
      
      })
    
      .catch((error)  =>  {
         console.error(error);
      });
}

  renderRow(quote) {
      return (
        <View style={styles.container}>
            <View style={styles.quoteRow}>
              <Text style={styles.bodyQuoteText}>{quote.body}</Text>
              <Text> - {quote.author}</Text>
              <View style={styles.bottomContainer}>
                   <Text style={styles.tagsQuote}>tags: {quote.tags}</Text>
                   <TouchableOpacity style={styles.shareContainer} onPress={this.shareQuote.bind(this,quote)}>
                      <Text style={styles.shareText}>Share</Text>
                      <Image source={require('../images/ic_share.png')} style= {styles.shareImage}/>
                   </TouchableOpacity>
              </View>
            </View>
        </View>
      )
  }

  render() {
    return (
      <View>
          <View style={{flexDirection: 'row', backgroundColor:'#ddd', justifyContent: 'center', alignItems: 'center',}}>
              <TextInput
                 style = {styles.textInput} editable = {true} autoFocus = {true} returnKeyType='search'returnKeyLabel='search'
                 placeholder="Search quotes" placeholderTextColor="grey" underlineColorAndroid="transparent"
                 onChangeText={this._onSearch.bind(this)}>
              </TextInput>
              <ActivityIndicator
                 animating = {this.state.animating}
                 color = '#fff'
                 size = "large"
                 style = {styles.activityIndicator}/>
          </View>
         <ListView                     
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
            enableEmptySections={true}
            style={{borderTopWidth:1, borderColor:'#ddd', marginBottom:50}}/>
       
      </View>
    );
  }

_onSearch(query){
  // alert(query);
  this.setState({searchQuery : query});
  this.searchQuoteRequest();
}

shareQuote(quote){
  // alert(quote);
   Share.share({
    message: quote.body+'\n- '+quote.author,
  }, {
    dialogTitle: 'Share Quote',
  })
  .then(this._showResult)
  .catch(err => console.log(err))
}

static navigationOptions = ({ navigation }) => {
  return {
      title: 'Search Quotes',
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

// static navigationOptions = {
//   const animating = this.state.animating
//   title: 'Search Quotes',
//   headerRight:  <ActivityIndicator
//                  animating = {animating}
//                  color = '#fff'
//                  size = "large"
//                  style = {styles.activityIndicator}/>,
//   headerStyle: {
//       backgroundColor: '#fff',
//     },
//   headerTitleStyle: {
//       color: 'black',
//     },
//   headerBackTitleStyle: {
//       color: 'black',
//     },
//       headerTintColor: 'black',
// };
}


const styles = StyleSheet.create({
  container:{
  },
  quoteRow:{
    justifyContent:'center', 
    padding:10, 
    borderBottomWidth:1, 
    borderColor:'#ddd',
    backgroundColor: '#fff'
  },
  bodyQuoteText:{
    fontSize: 16,
    color: '#000'
  },
  tagsQuote:{
    color: '#F97300',
  },
  textInput:{
    color:'#000',
    width: '100%',
    padding: 10,
    width: '85%',
    backgroundColor:'#ddd',
    alignItems: 'flex-end',
    fontSize:   16
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30
   },
    bottomContainer:{
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  shareContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center', 
    borderRadius: 20,
    width:70, 
    height:17,
  },
  shareText:{
    fontSize: 12,
    marginLeft:5,
    color: '#000',
    fontWeight:'bold', 
  },
  shareImage:{
    height: 20,
    width: 20,
  },
});