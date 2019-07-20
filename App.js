
import {
  createStackNavigator,
  createAppContainer,
  StyleSheet
} from 'react-navigation';

import { Animated, Easing, Platform } from 'react-native';

import Login from './src/pages/Login'
import Signup from './src/pages/Signup'
import index from './src/RoutesHome'
import DetalleScreen from './src/pages/detalle'
import PedidoScreen from './src/pages/car'
import Form from './src/components/Form'
import HomeScreen from './src/pages/Home'
import user from './src/pages/user'
import orden from './src/pages/orden'
import menu from './src/pages/menu'
import entrega from './src/pages/entrega'
import viewPedido  from './src/pages/viewPedido'
import viewEntrega from './src/pages/viewEntrega'
import mapa from './src/pages/map'
import profile from './src/pages/profile'

export function fromRight(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ layout, position, scene }) => {
      const { index } = scene;
      const { initWidth } = layout;

      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [initWidth, 0, 0],
      });

      const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

      return { opacity, transform: [{ translateX }] };
    },
  };
}


const RootStack = createStackNavigator({
Login: {
  screen: Login
},
Signup: {
  screen: Signup
},
index:{
  screen: index
  
},
Detalle:{
  screen:DetalleScreen
},
Car:{
  backgroundColor:'#c0e359',
  screen:PedidoScreen
},
user:{
  screen:user
},
orden:{
  screen:orden
},
menu:{
  screen:menu
},
entrega:{
  screen:entrega
},
viewPedido:{
  screen:viewPedido
},
viewEntrega:{
  screen:viewEntrega
},
mapa:{
  screen:mapa
},
profile:{
  screen:profile
}
},
{
  transitionConfig: () => fromRight()
},

);

console.disableYellowBox = true;



const App = createAppContainer(RootStack);

export default App;