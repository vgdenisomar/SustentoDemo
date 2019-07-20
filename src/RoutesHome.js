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
import profile from './pages/profile'
import {Ionicons,Entypo,AntDesign,Feather} from '@expo/vector-icons';
import car from './images/car.png'
import Icon from 'react-native-vector-icons/FontAwesome';


const AppNavigator=createMaterialTopTabNavigator({
    Home:{
        screen:HomeScreen,
        navigationOptions: {
            tabBarLabel:"Productos",
            tabBarIcon: ({ tintColor }) => (
              <AntDesign name="home" size={20} color="#000"/>
            ),
          },
    },
    Donaciones:{
        screen:PedidoScreen,
        navigationOptions: {
            tabBarLabel:"Donaciones",
            tabBarIcon: ({ tintColor }) => (
              <Feather name="gift" size={20} color="#000"/>
            ),
          },
    },
    profile:{
        screen:profile,
        navigationOptions: {
            tabBarLabel:"Perfil",
            tabBarIcon: ({ tintColor }) => (
              <AntDesign name="user" size={20} color="#000"/>
            ),
          },
          
    }
},

{
    navigationOptions:({navigation})=>({ 
         
        headerTitleStyle: { 
            flex:1,
            fontSize: 25, 
        },  
        
        headerRight: (
            
            <View style={{padding:5}}>
            <AntDesign onPress={() => navigation.navigate('Car')} name='shoppingcart' size={35} style={{marginRight:10}}></AntDesign>
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
        },
        showIcon:true,
    }
},



)
export default AppNavigator