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
        title:'Menu',
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
     <Text  style={styles.cont} > {item.codCliente} </Text> 
      <View style={{flex: 1, flexDirection: 'row'}}>
          <Text  style={styles.cont} style={{flex:3}}> {item.nomProd} </Text> 
          <AntDesign  onPress={this.delete.bind(this, item.codProd)} name='delete' size={32} style={{flex:3,textAlign:'right',margin:10, marginTop:5}}></AntDesign>
      </View>
        <Text  style={styles.cont} style={{textAlign:'right',marginRight:10}} > Cant: {item.cant} </Text> 
        <Text  style={styles.cont} style={{textAlign:'right',marginRight:10}} > Lps. {item.precioProd} </Text> 
        <Text  style={styles.cont} style={{textAlign:'right',marginRight:10}} > Total: {item.tot} </Text> 
      </View>
     </View> 
     
      )
  }

  delete=(codProd)=>{
    
    fetch('http://sustento.000webhostapp.com/deleteCar.php',{
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
          Toast.show('Eliminado',{duration:Toast.durations.SHORT, backgroundColor:'rgb(52, 52, 52)'});

        }
        else{
        alert(responseJson);
        }
    })
    .catch((error)=>{
      Toast.show('Eliminado',{duration:Toast.durations.SHORT, backgroundColor:'rgb(52, 52, 52)'});
      this.props.navigation.navigate('index')
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
      let myArray = await AsyncStorage.getItem('myArray');
      let d = JSON.parse(myArray);
       const UserEmail=d.UserEmail;
       this.setState({ show1: true });
      {
        fetch('http://sustento.000webhostapp.com/usuario1.php',{
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
       <View style={styles.container}> 
					<TouchableOpacity onPress={() => this.props.navigation.navigate('orden')} style={styles.button}>
            <Text style={styles.buttonText}>Pedidos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('entrega')} style={styles.button2}>
            <Text style={styles.buttonText}>Entregar</Text>
            </TouchableOpacity>
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
 
  container : {
    marginTop:15,
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1

  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'center',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'#001',
  	fontSize:16
  },
  signupButton: {
  	color:'#000',
  	fontSize:16,
  	fontWeight:'500'
  },
  inputBox: {
    width:300,
    backgroundColor:'#0001',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#000',
    height:40,
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#eebf1e',
     borderRadius: 15,
      marginVertical: 10,
      paddingVertical: 13
  },
  button2: {
    width:300,
    backgroundColor:'#1e86ee',
     borderRadius: 15,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#fff',
    textAlign:'center'
  }
     
    })
AppRegistry.registerComponent('Pedido', () => Myproject);