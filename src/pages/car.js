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
} from 'react-native'

import {Ionicons,EvilIcons, Entypo} from '@expo/vector-icons';

import{
  SearchBar, Icon
} from 'react-native-elements'

export default class app extends Component{

    constructor(props){
        super(props)
        this.state={
            email:'',
            pass:'',
            UserEmail:'',
            UserPassword:''
        }
      }

    static navigationOptions = {
        title:'Pedido'
      }

  renderItem = ({item})=> {
    return (
     <View  style={styles.container} > 
     <View  style={styles.card}>
     <Text  style={styles.cont} > {item.nomProveedor} </Text> 
      <View style={{flex: 1, flexDirection: 'row'}}>
          <Text  style={styles.cont} style={{flex:3}}> {item.codProd} </Text> 
          <Entypo  onPress={this.register.bind(this, item.codProd)} name='add-to-list' size={32} style={{flex:3,textAlign:'right',margin:10, marginTop:5}}></Entypo>
      </View>
        <Text  style={styles.cont} style={{textAlign:'right',marginRight:10}} > Lps. {item.precioProd} </Text>  

      </View>
     
       
     </View> 
     
      )
  }

  register=(codProd)=>{
    
    fetch('http://sustento.000webhostapp.com/obtenerCar.php',{
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
          alert('Agregado')

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
      cod:item.codCliente
    }
    this.codCliente=item.codCliente;
    AsyncStorage.setItem('myArray2',
    JSON.stringify(myArray2));
  }

  componentDidMount=async()=>{
      let myArray2 = await AsyncStorage.getItem('myArray2');
      let d = JSON.parse(myArray2);
       const codCliente2=d.cod;
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
                        dataSource : responseJson
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
           <FlatList 
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            />
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
     marginTop:10,
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