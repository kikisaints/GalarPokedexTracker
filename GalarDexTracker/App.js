import React from 'react';
import { StyleSheet, Text, View, StatusBar, Picker, TouchableOpacity, Image } from 'react-native';
import Collapsible from 'react-native-collapsible';

import MainPage  from './MainPage.js';

StatusBar.setBarStyle('dark-content', true);

export default function App() {
  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{marginTop: 50, alignSelf: 'center', flexDirection: 'column'}}>
          <Image style={{width: 35, height: 35}} resizeMode={'contain'} source={require('./assets/galar_dex_app_logo.png')}/>
        </View>
      </View>

      <MainPage/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignContent: 'stretch',
  },
  header: {
    backgroundColor: '#e8e8e8',
  },
});
