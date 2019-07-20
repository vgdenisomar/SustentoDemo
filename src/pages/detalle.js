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
  FlatList
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';
import Image from 'react-native-image-progress';  

export default class detalle extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
GetItem (names) {
   
  alert(names);
 
  }

  static navigationOptions = {
    title:'Detalle',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#c0e359',
    },

  }
 
 
  renderItem = ({item})=> {
    return (
     <View  style={styles.container} > 
         <Text  style={styles.cont} style={{marginRight:5,textAlign:'right',fontSize:20}}>{item.nomProveedor} </Text> 
         <Image style={styles.cardImage} source={{ uri: 'http://sustento.000webhostapp.com/'+item.imagenProd+'' }}indicator='bar' /> 
         <Text  style={styles.cont} style={{marginLeft:5, marginTop:5,fontSize:20}} >{item.nomProd} </Text> 
         <Text  style={styles.cont} style={{marginLeft:5,fontSize:20}}>{item.descProd} </Text> 
         <Text  style={styles.cont} style={{marginRight:5,textAlign:'right',fontSize:20}}> Disponible: {item.cantProd} und </Text> 
        <Text  style={styles.cont} style={{marginRight:5,textAlign:'right',fontSize:20}}> Normal: L.{item.precioProd} </Text>
        <Text  style={styles.cont} style={{marginRight:5,textAlign:'right',fontSize:20, color: '#26d30e'}} > Oferta: L.{item.precioOfProd} </Text>
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
                dataSource : responseJson,
                loading:false
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
       {this.state.loading?(
          <ActivityIndicator size={"large"} color={"green"}/>
       ):
       (
           <FlatList 
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
       />)}
       </View>
        )

  }
}
 
const styles = StyleSheet.create({
 
container :{
 backgroundColor: '#fff'
},

card:{

},
cardImage:{
  width:'100%',
  height:300,
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