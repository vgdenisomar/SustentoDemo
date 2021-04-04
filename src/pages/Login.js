import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  AsyncStorage,
  Image,
  TextInput,
  AppRegistry,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';

import { Ionicons, EvilIcons, Entypo, AntDesign,MaterialCommunityIcons,MaterialIcons} from '@expo/vector-icons';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.long = '',
      this.lat = '',
      this.state = {
        longitud: '',
        latitud: '',
        loading: false,
        email: '',
        pass: '',
        UserEmail: '',
        UserPassword: ''
      }
  }

  componentWillMount() {
    const { setParams } = this.props.navigation;
    setParams({ websiteURL: this.props.websiteURL });
  }

  static navigationOptions = ({ navigation }) => {

    const { state } = navigation;

    if (state.params != undefined) {
      return {
        title: 'Login',
        headerTintColor: '#ffffff',
        headerStyle: {
          visible: false,
          backgroundColor: '#c0e359',
        },
        headerRight:
          <View style={{ padding: 5 }}>
            <AntDesign onPress={() => navigation.navigate('user')} name='user' size={35} style={{ marginRight: 10 }}></AntDesign>
          </View>
      }
    }

  };

  componentDidMount = async () => {
    let myArray = await AsyncStorage.getItem('myArray');
    let d = JSON.parse(myArray);
    this.setState({
      UserEmail: d.UserEmail,
      UserPassword: d.UserPassword,
    })
    let myArray3 = await AsyncStorage.getItem('myArray3');
    let e = JSON.parse(myArray3);
    this.lat = e.latitud;
    this.long = e.longitud;
  }
  login = () => {
    let error = '';
    if (!this.state.UserEmail.length > 0) {
      alert('Llene todos los campos');
      return;
    }
    if (!this.state.UserPassword.length > 0) {
      alert('Llene todos los campos');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.setState({
          latitud: position.coords.latitude,
          longitud: position.coords.longitude,
          error: null,
        });
        console.log(this.lat)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.setState(
      {
        loading: true
      }
    )
    const { UserEmail, UserPassword, longitud, latitud } = this.state;
    let myArray = {
      UserEmail: UserEmail,
      UserPassword: UserPassword,
      longitud: this.long,
      latitud: this.lat,
    }
    AsyncStorage.setItem('myArray',
      JSON.stringify(myArray));

    let myArray3 = {
      longitud: this.long,
      latitud: this.lat,
    }

    let details = {
      email: UserEmail,
      password: UserPassword
    };

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
  
    AsyncStorage.setItem('myArray3',
      JSON.stringify(myArray3));
      fetch('http://192.168.1.8:3001/api/security/login', {
      method: 'post',
      headers: {
        'Authorization': 'Bearer token',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          console.log(responseJson.userF);
          console.log(UserEmail)
          this.setState(
            {
              loading: false
            }
          )
          //Then open Profile activity and send user email to profile activity.
          this.props.navigation.navigate('Home');

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
        console.error(error)
      });
  }
  render() {
    return (
      <View style={styles.container}>
            <View style={styles.container2}>
            <Image style={{ width: 150, height: 150, marginBottom: 25, textAlign: 'center' }}
            source={require('../images/logoSustento.jpeg')} />
            </View>
         
          {this.state.loading ? (
            <ActivityIndicator size={"large"} color={"green"} />
          ) :
            (
              <View style={styles.inputContainer}>
              <MaterialCommunityIcons style={styles.inputIcon} name='email-outline' size={35} style={{marginRight:10}}></MaterialCommunityIcons>
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
                <Text style={styles.buttonText} onPress={this.login}>Ingresar</Text>
              </TouchableOpacity>
            )}
        <View><Text></Text></View>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>No tienes cuenta aún?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}><Text style={styles.signupButton}>Registrate</Text></TouchableOpacity>
        </View>
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
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
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
    fontWeight: '500',
    marginLeft:5
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
AppRegistry.registerComponent('Login', () => Myproject);