import React, { Component } from 'react';
import{
    View,
    Text,
    StyleSheet,
    AppRegistry,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image,
    AsyncStorage,
    ActivityIndicator,
    Platform
} from 'react-native'


import Toast from 'react-native-root-toast'

import {Ionicons,EvilIcons, Entypo,AntDesign} from '@expo/vector-icons';

import{
  SearchBar, Icon
} from 'react-native-elements'

export default class app extends Component{

    constructor(props){
        super(props);
        this.cont=0;
        this.ISV1=0;
        this.TOTAL1=0;
        this.codProd;
        this.codCliente;
        this.state={
            total:0,
            ISV:0,
            subtotal:0,
            email:'',
            loading:true,
            pass:'',
            UserEmail:'',
            UserPassword:''
        }
      }

    static navigationOptions = {
        title:'Pedidos',
        headerTintColor: '#ffffff',
        headerStyle: {
          visible: false,
          backgroundColor: '#c0e359',
        },
      }

  renderItem = ({item})=> {
    return (
     <View  style={styles.container} > 
     <View  style={styles.card}>
     <View style={{flex: 1, flexDirection: 'row'}}>
          <Text  style={styles.cont} > Tiene un pedido de {item.nomCliente} </Text> 
          <AntDesign  onPress={() =>this.props.navigation.navigate('viewPedido',{id:this.codProveedor,id2:item.codPedido})} name='right' size={32} style={{flex:3,textAlign:'right',margin:10, marginTop:5}}></AntDesign>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
          <AntDesign  onPress={this.aceptar.bind(this, item.codPedido)} name='checkcircleo' size={32} style={{flex:1,textAlign:'center',margin:10,marginTop:5}}></AntDesign>
          <AntDesign  onPress={this.cancelar.bind(this, item.codPedido)} name='closecircleo' size={32} style={{flex:1,textAlign:'center',margin:10, marginTop:5}}></AntDesign>
      </View>
      </View>
     </View> 
     
      )
  }

  aceptar=(codPedido)=>{
    
    fetch('http://sustento.000webhostapp.com/aceptarPedido.php',{
        method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
            // we will pass our input data to server
            codPedido:codPedido,
            id:this.codProveedor
        })
        
    })
    .then((response) => response.json())
    .then((responseJson)=>{
        if(responseJson === 'Data Matched')
        {
          Toast.show('Aceptado',{duration:Toast.durations.SHORT, backgroundColor:'rgb(52, 52, 52)'});

        }
        else{
        alert(responseJson);
        }
    })
    .catch((error)=>{
      Toast.show('Aceptado',{duration:Toast.durations.SHORT, backgroundColor:'rgb(52, 52, 52)'});
      this.props.navigation.navigate('menu')
});
}


cancelar=(codPedido)=>{
    
  fetch('http://sustento.000webhostapp.com/cancelarPedido.php',{
      method:'post',
      header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
      },
      body:JSON.stringify({
          // we will pass our input data to server
          codPedido:codPedido,
          id:this.codProveedor
      })
      
  })
  .then((response) => response.json())
  .then((responseJson)=>{
      if(responseJson === 'Data Matched')
      {
        Toast.show('Cancelado',{duration:Toast.durations.SHORT, backgroundColor:'rgb(52, 52, 52)'});

      }
      else{
      alert(responseJson);
      }
  })
  .catch((error)=>{
    Toast.show('Cancelado',{duration:Toast.durations.SHORT, backgroundColor:'rgb(52, 52, 52)'});
    this.props.navigation.navigate('menu')
});
}


  renderItem2 = ({item})=> {
    let myArray3={
      codProv:item.codProveedor
    }
    this.codProveedor=item.codProveedor;
    AsyncStorage.setItem('myArray3',
    JSON.stringify(myArray3));
  }

  componentDidMount=async()=>{
      let myArray = await AsyncStorage.getItem('myArray3');
      let d = JSON.parse(myArray);
       this.codProveedor=d.codProv;
       this.setState({ show1: true });
      {
        fetch('http://sustento.000webhostapp.com/obtenerPedido.php',{
          method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          body:JSON.stringify({
              // we will pass our input data to server
              codProv: this.codProveedor
          })
          
      })
      .then((response) => response.json())
      .then((responseJson)=>{
                    this.setState(
                      {
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
  filterSearch=()=>{
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

  email=()=>{
    {
    fetch('http://sustento.000webhostapp.com/email.php',{
        method:'post',
        header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body:JSON.stringify({
            codCliente:this.codCliente,
            pedido:this.state.dataSource,
        })
        
    })
    .then((response) => response.json())
    .then((responseJson)=>{
        if(responseJson === 'Data Matched')
        {
          Toast.show('Eliminado',{duration:Toast.durations.SHORT, backgroundColor:'rgb(52, 52, 52)'});

        }
        else{
        alert(responseJson);
        }
    })
    .catch((error)=>{
      Toast.show('Enviado',{duration:Toast.durations.SHORT, backgroundColor:'rgb(52, 52, 52)'});
      this.props.navigation.navigate('index')
});
    }
}


  
  
  

  render() {
     return (
       <View style={styles.MainContainer}> 

       <FlatList 
            data={this.state.dataSource2}
            renderItem={this.renderItem2}
            keyExtractor={(item, index) => index.toString()}
            />
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

       </View>
        )

  }
}

const styles = StyleSheet.create({
 
    MainContainer:{

    },
    container :{
     backgroundColor: '#fff',
     marginTop:10,
    },
    button: {
      width:150,
      backgroundColor:'#327ccf',
       borderRadius: 25,
        marginVertical: 5,
        paddingVertical: 5
    },
    button2:{
      backgroundColor: '#c0e359',
      alignItems:'center',
    },
    buttonText: {
      fontSize:16,
      fontWeight:'500',
      color:'#fff',
      textAlign:'center'
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
AppRegistry.registerComponent('Pedido', () => Myproject);