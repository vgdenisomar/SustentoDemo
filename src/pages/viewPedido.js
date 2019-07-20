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
  Image
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';

export default class detalle extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      subtotal:2,
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


  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={{ }}>
          <View style={{ flexDirection: 'row', backgroundColor: '#c0e359', justifyContent: 'center', paddingRight: 8 }}>
          <Text style={{ margin: 40, marginTop: 5, marginBottom:5}} >Producto</Text>
          <Text style={{margin: 40, marginTop: 5, marginBottom:5 }}>Cantidad</Text>
          <Text style={{margin: 40, marginTop: 5, marginBottom:5 }}>Subtotal</Text>
          </View>
        </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )

  }
}

const styles = StyleSheet.create({

  MainContainer: {
  },
  container: {
    marginTop: 5,
  },

  card: {

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