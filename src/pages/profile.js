import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
import Image from 'react-native-image-progress';  
import {Ionicons,Entypo} from '@expo/vector-icons';
 
import {
    AppRegistry,
    StyleSheet,
    View,
    AsyncStorage,
    TextInput,
    Text
} from 'react-native';
 
class HelloWorld extends Component {

    constructor(props) {
        super(props);
        this.state = {
          qrcode:'2d',
          nombre:''
        }
      }

      

      static navigationOptions = {
        title:'Perfil',
        headerTintColor: '#ffffff',
        headerStyle: {
          visible: false,
          backgroundColor: '#c0e359',
        },
        tabBarIcon: ({ tintColor }) => <Entypo name="shopping-cart" color={tintColor}></Entypo>
      }

  componentDidMount() {
    this.register();
  }
  register=async()=>{
    let myArray2 = await AsyncStorage.getItem('myArray2');
    let d = JSON.parse(myArray2);
    const codCliente2=d.cod;
    this.setState({
        nombre:d.nom
    })
    fetch('http://sustento.000webhostapp.com/qrcode.php',{
        method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
            codCliente: codCliente2
        })
        
    })
    .then((response) => response.json())
    .then((responseJson)=>{
        this.setState({
            qrcode:responseJson
        })
        console.log(responseJson);
    })
    .catch((error)=>{
    console.error(error);
});
}
 
  render() {
    const {
      thumbnailSource,
      source,
      style,
      ...props
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={{textAlign:'center', margin:5, fontSize:18}}>Hola {this.state.nombre}</Text>
        <Text style={{textAlign:'center', margin:5, marginLeft:25, marginRight:25, fontSize:18}}>!Descargue el autenticador de google en PlayStore o AppStore y escanee el siguiente codigo para poder cancelar sus compras! </Text>
        <Image
        source={{ uri:this.state.qrcode }} 
        indicator='bar' 
  style={{
    width: 200, 
    height: 190, 
  }}
         />
      </View>
    );
  };
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    },
    imageOverlay: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
});
 
AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
 
module.exports = HelloWorld;