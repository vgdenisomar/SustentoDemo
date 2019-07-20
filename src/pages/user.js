import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  AppRegistry,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';


import { Ionicons, EvilIcons, Entypo, AntDesign,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';
export default class user extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      email: '',
      pass: '',
      UserEmail: '',
      UserPassword: ''
    }
  }

  static navigationOptions = {
    title: 'Usuarios',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#c0e359',
    },

  }
  componentDidMount = async () => {
    let myArray = await AsyncStorage.getItem('myArray');
    let d = JSON.parse(myArray);
    this.setState({
      UserEmail: d.UserEmail,
      UserPassword: d.UserPassword
    })
  }
  login = () => {
    this.setState(
      {
        loading: true
      }
    )
    const { UserEmail, UserPassword } = this.state;
    let myArray = {
      UserEmail: UserEmail,
      UserPassword: UserPassword
    }
    AsyncStorage.setItem('myArray',
      JSON.stringify(myArray));
    fetch('http://sustento.000webhostapp.com/loginPro.php', {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // we will pass our input data to server
        email: UserEmail,
        password: UserPassword
      })

    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === 'Data Matched') {
          this.setState(
            {
              loading: false
            }
          )
          this.props.navigation.navigate('menu');

        }
        else {
          this.setState(
            {
              loading: false
            }
          )
          alert(responseJson);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior='position'
          keyboardVerticalOffset={-20}>
                   <View style={styles.container2}>
            <Image style={{ width: 150, height: 150, marginBottom: 25, textAlign: 'center' }}
            source={require('../images/logoSustento.jpeg')} />
            </View>
          {this.state.loading ? (
            <ActivityIndicator size={"large"} color={"green"} />
          ) :
            (
              <View style={styles.inputContainer}>
              <AntDesign style={styles.inputIcon} name='user' size={35} style={{marginRight:10}}></AntDesign>
              <TextInput style={styles.inputBox} 
              onChangeText={UserEmail=>this.setState({UserEmail})}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Email"
              placeholderTextColor = "#000"
              keyboardType="email-address"
              onSubmitEditing={()=> this.password.focus()}
              value={this.state.UserEmail}
              />
              </View>
            )}
          {this.state.loading ? (
            <Text></Text>
          ) :
            (
              <View style={styles.inputContainer}>
                <MaterialIcons style={styles.inputIcon} name='lock-outline' size={35} style={{marginRight:10}}></MaterialIcons>
              <TextInput style={styles.inputBox}
                onChangeText={UserPassword => this.setState({ UserPassword })}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#000"
                ref={(input) => this.password = input}
                value={this.state.UserPassword}
              />
              </View>
            )}
        {this.state.loading ? (
          <Text></Text>
        ) :
          (
            <TouchableOpacity style={styles.button} onPress={this.login}>
              <Text style={styles.buttonText} onPress={this.login}>Acceder</Text>
            </TouchableOpacity>
          )}
                  </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: '#001',
    fontSize: 16
  },
  inputContainer: {

    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
},
  signupText: {
    color: '#001',
    fontSize: 16
  },
  signupButton: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500'
  },
  inputBox: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
    height: 40,
    marginVertical: 10,
    marginLeft:0
  },
  button: {
    width: 300,
    backgroundColor: '#c0e359',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center'
  }
});
AppRegistry.registerComponent('user', () => Myproject);