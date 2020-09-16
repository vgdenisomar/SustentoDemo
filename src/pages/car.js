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
        title:'Pedido',
        headerTintColor: '#ffffff',
        headerStyle: {
          visible: false,
          backgroundColor: '#c0e359',
        },
      }

  renderItem = ({item})=> {
    return (
      this.cont=this.cont+parseInt(item.tot),
      this.ISV1=this.cont*0.15,
      this.TOTAL1=this.cont+this.ISV1,
      this.setState({
        subtotal:this.cont,
        ISV:this.ISV1,
        total:this.TOTAL1
      }),
     <View  style={styles.container} > 
     <View  style={styles.card}>
     <Text  style={styles.cont} > {item.nomProveedor} </Text> 
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
 
  }

  componentDidMount=async()=>{
      let myArray2 = await AsyncStorage.getItem('myArray2');
      let d = JSON.parse(myArray2);
       const codCliente2=d.cod;
       this.codCliente=d.cod;
       this.setState({ show1: true });
       {
        fetch('http://sustento.000webhostapp.com/obtenerCar.php',{
          method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          body:JSON.stringify({
              // we will pass our input data to server
              codCliente: codCliente2
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
          Toast.show('Enviado',{duration:Toast.durations.SHORT, backgroundColor:'rgb(52, 52, 52)'});
          this.props.navigation.navigate('index')
        }
        else{
        alert(responseJson);
        }
    })
    .catch((error)=>{
      alert(error);
});
    }
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
            />
       )}
            <View style={{paddingBottom:110}}>
              <View style={{flexDirection: 'row',backgroundColor: '#c0e359',justifyContent :'flex-end', paddingRight:8}}>
                  <Text onPress={this.login}>Subtotal: </Text>
                  <Text onPress={this.login} >{this.state.subtotal}</Text>
              </View>
              <View style={{flexDirection: 'row',backgroundColor: '#c0e359',justifyContent :'flex-end', paddingRight:8}}>
                  <Text onPress={this.login}>ISV: </Text>
                  <Text onPress={this.login}>{this.state.ISV}</Text>
              </View>
              <View style={{flexDirection: 'row',backgroundColor: '#c0e359',justifyContent :'flex-end', paddingRight:8}}>
                  <Text onPress={this.login}>TOTAL: </Text>
                  <Text onPress={this.login}>{this.state.total}</Text>
              </View>
              
              <View style={styles.button2}>
                <TouchableOpacity style={styles.button} onPress={this.login}>
                    <Text style={styles.buttonText} onPress={this.email}>Pedido</Text>
                </TouchableOpacity>  
            </View>

            </View>

       </View>
        )

  }
}

const styles = StyleSheet.create({
 
    MainContainer:{
      marginBottom: Platform.OS === 'android' ? 95:90,

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