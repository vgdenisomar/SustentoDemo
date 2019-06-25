import React, { Component } from 'react';
import{
    View,
    Text,
    StyleSheet,
    AppRegistry,
} from 'react-native'


export default class app extends Component{
    static navigationOptions = {
        title:'Donaciones'
      }
     
    render(){
        return(
            <View style={{flex:1}}>
                <Text>Donaciones</Text>
            </View>
        )
    }
}
AppRegistry.registerComponent('Pedido', () => Myproject);