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
  TextInput,
  AsyncStorage,
  Button,
  ToastAndroid
} from 'react-native';

import Image from 'react-native-image-progress';  
import Toast from 'react-native-root-toast'

import {Ionicons,EvilIcons, Entypo} from '@expo/vector-icons';

import{
  SearchBar, Icon
} from 'react-native-elements'

import Logo from '../components/Logo';
import Form from '../components/Form';
import { AntDesign, FontAwesome} from '@expo/vector-icons';


export default class app extends Component{
    
  constructor(props) {
    super(props);
    this.arrayholder = [];
    this.arrayholder2 = [];
    this.codProd;
    this.codCliente;
    this.long='',
    this.lat='',
    this.state = {
      loading: true,
      error: null,   
      search:'',

      
      
    }
  }

    static navigationOptions = {
        title:'Donaciones'
      }
     
    
  renderItem = ({item})=> {
    return (
     <View  style={styles.container} > 
     <View  style={styles.card}>
      <TouchableOpacity onPress={() =>this.props.navigation.navigate('Detalle',{id:item.codProd})}>
         <Image style={styles.cardImage} source={{ uri: 'http://sustento.000webhostapp.com/'+item.imagenOrg+'' }} indicator='bar' /> 
      </TouchableOpacity>
      </View>
     
       
     </View> 
     
      )
  }

  register=(codProd)=>{
    
    fetch('http://sustento.000webhostapp.com/registerCar.php',{
        method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
            // we will pass our input data to server
            codProd:codProd,
            codCliente:this.codCliente,
        })
        
    })
    .then((response) => response.json())
    .then((responseJson)=>{
        if(responseJson === 'Data Matched')
        {
          Toast.show('Agregado',{duration:Toast.durations.SHORT, backgroundColor:'rgb(52, 52, 52)'});

        }
        else{
        alert(responseJson);
        }
    })
    .catch((error)=>{
    console.error(error);
});
}

  renderItem2 = ({item})=> {
    let myArray2={
      cod:item.codCliente,
      nom:item.nomCliente
    }
    this.codCliente=item.codCliente;
    AsyncStorage.setItem('myArray2',
    JSON.stringify(myArray2));
  }

  componentDidMount=async()=>{
    let myArray3 = await AsyncStorage.getItem('myArray3');
    let e = JSON.parse(myArray3);
    this.long=e.longitud;
    this.lat=e.latitud;
      let myArray = await AsyncStorage.getItem('myArray');
      let d = JSON.parse(myArray);
       const UserEmail=d.UserEmail;
       this.setState({ show1: true });
       {const url = "http://sustento.000webhostapp.com/organizaciones.php";
       fetch(url,{
        method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
        })
       })
       .then((response)=>response.json())
                 .then((responseJson)=> {
                   this.setState({
                     dataSource : responseJson,
                     loading:false
                   },
                   function() {
                    this.arrayholder = responseJson;
                  }
                   )
                  })
                  .catch((error)=> {
                    this.setState({error,loading:false})
                    console.log(error);
                  });}
      {
        fetch('http://sustento.000webhostapp.com/usuario.php',{
          method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          body:JSON.stringify({
              // we will pass our input data to server
              email: UserEmail
          })
          
      })
      .then((response) => response.json())
      .then((responseJson)=>{
                    this.setState(
                      {
                        dataSource2 : responseJson
                      },
                    function() {
                     this.arrayholder2 = responseJson;
                   }
                    )
                   })
                   .catch((error)=> {
                     this.setState({error,loading:false})
                     console.log(error);
                   })  
      }
           
  }
  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }

    if (this.state.show == true) {
      this.setState({ show1: true });
    } else {
      this.setState({ show1: false });
    }
    
  };
 
  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };
  filterSearch=text=>{
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData =  item.nomProd ? item.nomProd.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search:text
    });
    
  }
  
  
  

  render() {
     return (
       <View style={styles.MainContainer}> 
       {this.state.show1 ? (
            <View style={{alignItems:'flex-end', margin:5, marginBottom:0}} >
                <Icon type='evilicon' name='search' onPress={this.ShowHideComponent}></Icon>
            </View>
           ) : null}
       {this.state.show ? (
           <SearchBar
           containerStyle={{backgroundColor:"#fff",marginBottom:0,borderWidth: 0, shadowColor: 'white', //no effect
           borderBottomColor: 'transparent',
           borderTopColor: 'transparent'}}
           inputContainerStyle={{backgroundColor:"#f4f4f4"}}
          round
          onChangeText={text => this.filterSearch(text)}
          onClear={this.ShowHideComponent }
          placeholder="Busque aqui"
          value={this.state.search}
          showOnLoad
          />
           ) : null}
           {this.state.loading?(
          <ActivityIndicator size={"large"} color={"green"}/>
       ):
       (
           <FlatList 
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            />
            )}
            <FlatList 
            data={this.state.dataSource2}
            renderItem={this.renderItem2}
            keyExtractor={(item, index) => index.toString()}
            />
       </View>
        )

  }
}
 
const styles = StyleSheet.create({
 
MainContainer:{
  marginBottom:50
},
container :{
 backgroundColor: '#fff',
 marginTop:5,
 fontSize:20,
},

card:{
  backgroundColor:'#fff',
  marginBottom:10,
  marginLeft:'2%',
  width:'96%',
  shadowColor: "#000",
  shadowOffset: {
	width: 0,
	height: 6,
},
shadowOpacity: 0.37,
shadowRadius: 7.49,

elevation: 12,
},

textInput:{
  backgroundColor:"#fff"
},
cardImage:{
  width:'100%',
  height:500,
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
AppRegistry.registerComponent('Pedido', () => Myproject);