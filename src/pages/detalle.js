import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  AppRegistry,
  ActivityIndicator,
  ListView,
  FlatList,
  Image
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';

export default class detalle extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
GetItem (names) {
   
  alert(names);
 
  }

  static navigationOptions = {
    title:'Detalle',
    activeTintColor:'black',
  }
 
 
  renderItem = ({item})=> {
    return (
     <View  style={styles.container} > 
         <Image style={styles.cardImage} source={{ uri: 'http://sustento.000webhostapp.com/'+item.imagenProd+'' }} /> 
         <Text  style={styles.cont} > {item.nomProd} </Text> 
         <Text  style={styles.cont} > {item.descProd} </Text> 
         <Text  style={styles.cont} > Stock: {item.cantProd} </Text> 
        <Text  style={styles.cont} > Lps. {item.precioProd} </Text>
        <Text  style={styles.cont} > {item.nomProveedor} </Text> 
     </View> 
     
      )
  }
  fetchData = async() =>{
    const { params } = this.props.navigation.state;
    fetch('http://sustento.000webhostapp.com/detalle.php',{
            method:'post',
            header:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                // we will pass our input data to server
                id: params.id,
            })
            
        })
        .then((response) => response.json())
        .then((responseJson)=>{
            this.setState({
                dataSource : responseJson
              })
        })
        .catch((error)=>{
        console.error(error);
    });
};

  componentDidMount() {
    this.fetchData();
  }


  render() {
     return (
       <View style={styles.MainContainer}> 
           <FlatList 
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            />
       </View>
        )

  }
}
 
const styles = StyleSheet.create({
 
container :{
 marginTop:20,
 backgroundColor: '#F5FCFF'
},

card:{

},
cardImage:{
  width:'100%',
  height:200,
  resizeMode:'cover'
},
   rowViewContainer: {
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor:'#fff',
        color:'#000',
        
      },

      cont:{
        color: '#000'
      }
 
})

AppRegistry.registerComponent('detalle', () => Myproject);