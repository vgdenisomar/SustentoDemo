import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  AsyncStorage,
  TextInput
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';

export default class Login extends Component {
    
    static navigationOptions = {
        title:'Login',
        headerTintColor: '#ffffff',
        headerStyle: {
          visible: false,
          backgroundColor: '#c0e359',
        },

}
constructor(props){
  super(props)
  this.state={
      email:'',
      pass:'',
      UserEmail:'',
      UserPassword:''
  }
}
  componentDidMount=async()=> {
    let myArray = await AsyncStorage.getItem('myArray');
    let d = JSON.parse(myArray);
    this.setState({
      UserEmail:d.UserEmail,
      UserPassword:d.UserPassword
    })
  }
  login=()=>{
      const {UserEmail,UserPassword}=this.state;
      let myArray={
        UserEmail: UserEmail,
        UserPassword: UserPassword
      }
      AsyncStorage.setItem('myArray',
      JSON.stringify(myArray));
      fetch('http://sustento.000webhostapp.com/sesion.php',{
          method:'post',
          header:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          body:JSON.stringify({
              // we will pass our input data to server
              email: UserEmail,
              password: UserPassword
          })
          
      })
      .then((response) => response.json())
      .then((responseJson)=>{
          if(responseJson === 'Data Matched')
          {
              //Then open Profile activity and send user email to profile activity.
          this.props.navigation.navigate('Home');
  
          }
          else{
  
          alert(responseJson);
          }
      })
      .catch((error)=>{
       console.error(error);
  });
  }
	render() {
		return(
			<View style={styles.container}>
				<Logo/>
                <TextInput style={styles.inputBox} 
                onChangeText={UserEmail=>this.setState({UserEmail})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Email"
                placeholderTextColor = "#000"
                selectionColor="#000"
                keyboardType="email-address"
                onSubmitEditing={()=> this.password.focus()}
                 />
             <TextInput style={styles.inputBox} 
                onChangeText={UserPassword=>this.setState({UserPassword})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor = "#000"
                ref={(input) => this.password = input}
                />  
            <TouchableOpacity style={styles.button} onPress={this.login}>
                <Text style={styles.buttonText} onPress={this.login}>Ingresar</Text>
            </TouchableOpacity>    
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>No tienes cuenta aun?</Text>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}><Text style={styles.signupButton}>Registrate</Text></TouchableOpacity>
				</View>
			</View>	
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#fff',
    flex: 1,
    alignItems:'center',
    justifyContent :'flex-end'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
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
    backgroundColor:'#c0e359',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#fff',
    textAlign:'center'
  }
});
