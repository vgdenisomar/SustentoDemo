import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity,
  TextInput
} from 'react-native';


export default class Form extends Component {

    
    static navigationOptions = {
        header: null
}

    constructor(props){
        super(props)
        this.state={
            UserEmail:'',
            UserPassword:''
        }
    }
    login=()=>{
        const {UserEmail,UserPassword}=this.state;
        fetch('http://192.168.0.3/prueba/sesion.php',{
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
               this.navigation.navigate('Home');
     
            }
            else{
     
              alert(responseJson);
            }
		 })
		 .catch((error)=>{
		 console.error(error);
});
    }
	render(){
		return(
			<View style={styles.container}>
          <TextInput style={styles.inputBox} 
              onChangeText={UserEmail=>this.setState({UserEmail})}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Email"
              placeholderTextColor = "#000"
              selectionColor="#fff"
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
           <TouchableOpacity style={styles.button}>
             <Text style={styles.buttonText} onPress={this.login}>{this.props.type}</Text>
           </TouchableOpacity> 
               
  		</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },

  inputBox: {
    width:300,
    backgroundColor:'#0001',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#000',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
  
});