import React, { Component } from 'react';
import{
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native'

import {createAppContainer} from 'react-navigation'
import AppNavigator from '../RoutesHome'

const AppIndex = createAppContainer(AppNavigator);

export default class app extends Component{
    render(){
        return(
            <View style={{flex:1}}>

                <AppIndex/>
            </View>
        )
    }
}

AppRegistry.registerComponent('index', () => Myproject);