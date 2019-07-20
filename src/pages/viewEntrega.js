import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  AppRegistry,
  ActivityIndicator,
  ListView,
  FlatList,
  Image,
  Platform,
  TextInput
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';

import Toast from 'react-native-root-toast'

export default class detalle extends Component {

  constructor(props) {
    super(props);
    this.cont = 0;
    this.ISV1 = 0;
    this.TOTAL1 = 0;
    this.codProd;
    this.codCliente;
    this.state = {
      total: 0,
      ISV: 0,
      subtotal: 0,
      email: '',
      loading: true,
      pass: '',
      UserEmail: '',
      totpCode: ''
    }
  }

  GetItem(names) {

    alert(names);

  }

  static navigationOptions = {
    title: 'Detalle',
    headerTintColor: '#ffffff',
    headerStyle: {
      visible: false,
      backgroundColor: '#c0e359',
    },
  }


  renderItem = ({ item }) => {
    return (
      <View style={styles.container} >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={{ flex: 1, textAlign: 'center', margin: 10, marginTop: 5 }} > {item.nomProd} </Text>
          <Text style={{ flex: 1, textAlign: 'center', margin: 10, marginTop: 5 }}> {item.cant} </Text>
          <Text style={{ flex: 1, textAlign: 'center', margin: 10, marginTop: 5 }} > {item.subtotal} </Text>
        </View>
      </View>

    )
  }
  fetchData = async () => {
    const { params } = this.props.navigation.state;
    fetch('http://sustento.000webhostapp.com/detallePedido.php', {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // we will passour input data to server
        id: params.id,
        id2: params.id2
      })

    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  confirmar = (cd) => {
    const { params } = this.props.navigation.state;
    const { totpCode } = this.state;
    fetch('http://sustento.000webhostapp.com/comprobar.php', {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        codPedido: params.id2,
        id: params.id,
        codigo: totpCode
      })

    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === 'Data Matched') {
          fetch('http://sustento.000webhostapp.com/confirmar.php', {
            method: 'post',
            header: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              codPedido: params.id2,
              id: params.id
            })

          })
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson === 'Data Matched') {


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
              Toast.show('Pagado',{duration:Toast.durations.SHORT, backgroundColor:'rgb(52, 52, 52)'});
      this.props.navigation.navigate('menu')
            });


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
      <View style={styles.MainContainer}>
        <View style={{}}>
          <View style={{ flexDirection: 'row', backgroundColor: '#c0e359', justifyContent: 'center', paddingRight: 8 }}>
            <Text style={{ margin: 40, marginTop: 5, marginBottom: 5 }} >Producto</Text>
            <Text style={{ margin: 40, marginTop: 5, marginBottom: 5 }}>Cantidad</Text>
            <Text style={{ margin: 40, marginTop: 5, marginBottom: 5 }}>Subtotal</Text>
          </View>
        </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.button2}>

          <TextInput style={styles.inputBox}
            onChangeText={totpCode => this.setState({ totpCode })}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Codigo de 6 digitos"
            placeholderTextColor="#0005"
            keyboardType='numeric'
            maxLength={6}
            value={this.state.totpCode}
          />
          <TouchableOpacity style={styles.button} onPress={this.login}>
            <Text style={styles.buttonText} onPress={this.confirmar.bind(this, 'd')}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({

  container: {
  },
  inputBox: {
    width: 300,
    backgroundColor: '#0001',
    borderRadius: 15,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000',
    height: 40,
    marginVertical: 10,
    alignItems: 'center',
    textAlign: 'center'
  },
  MainContainer: {
    marginBottom: Platform.OS === 'android' ? 95 : 90,

  },

  card: {

  },
  button: {
    width: 150,
    backgroundColor: '#327ccf',
    borderRadius: 25,
    marginVertical: 5,
    paddingVertical: 5
  },
  button2: {
    backgroundColor: '#c0e359',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center'
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  rowViewContainer: {
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    color: '#000',

  },

  cont: {
    color: '#000'
  }

})

AppRegistry.registerComponent('detalle', () => Myproject);