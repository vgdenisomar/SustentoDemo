import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image 
} from 'react-native';

export default class Logo extends Component {
	render(){
		return(
			<View style={styles.container}>
				<Image  style={{width:150, height: 150}}
          			source={require('../images/logoSustento.jpeg')}/>
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
  logoText : {
  	marginVertical: 0,
  	fontSize:18,
  	color:'#000'
  }
});