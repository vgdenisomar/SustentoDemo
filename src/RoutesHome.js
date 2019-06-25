import React, { Component } from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation';
import{
    Button,
    View,
    Text,
    TouchableOpacity
} from 'react-native'

import HomeScreen from './pages/Home'
import PedidoScreen from './pages/Pedido'
import {Ionicons,Entypo} from '@expo/vector-icons';
import car from './images/car.png'



const AppNavigator=createMaterialTopTabNavigator({
    Home:{
        screen:HomeScreen,
    },
    Donaciones:{
        screen:PedidoScreen
    },
},

{
    navigationOptions:({navigation})=>({ 
        headerLeft: null,
         
        headerTitleStyle: { 
            flex:1,
            fontSize: 25, 
        },  
        
        headerRight: (
            
            <View style={{padding:5}}>
            <View style={{
                position:'absolute',height:20,width:20,
                borderRadius:15,backgroundColor:'rgba(95,197,123,0.8)',
                right:30,bottom:20,alignItems:'center', justifyContent:'center', zIndex:2000
                }}>
                <Text onPress={() => navigation.navigate('Car')}>0</Text>
            </View>
            <Entypo onPress={() => navigation.navigate('Car')} name='shopping-cart' size={32} style={{marginRight:10}}></Entypo>
            </View>
    
          ),
        title:'Sustento',
         headerTintColor: '#ffffff',
         headerStyle: {
            backgroundColor: '#c0e359',
        },
}),
    tabBarOptions:{
        activeTintColor:'black',
        inactiveTintColor: '#666',
        style:{
            backgroundColor:'#c0e359'
        }
    }
},



)
export default AppNavigator