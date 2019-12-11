import React from 'react';
import { StyleSheet, Text, View, StatusBar, Picker, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';

import MainPage  from './MainPage.js';

StatusBar.setBarStyle('light-content', true);

export default function App() {
  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{marginTop: 50, alignSelf: 'center', flexDirection: 'column'}}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>Galar Pokedex Tracker</Text>
        </View>
      </View>

      <MainPage/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignContent: 'stretch',
  },
  header: {
    backgroundColor: '#a83232',
  },
});
