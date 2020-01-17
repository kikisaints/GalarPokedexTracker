import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, AsyncStorage, TouchableOpacity, ActivityIndicator } from 'react-native';
import PokedexListItem  from './PokedexListItem';

export default class PokedexList extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  getIconNumber(natDexNumber, currentIndex)
  {
    if(natDexNumber < 10)
    {
      return "00" + natDexNumber.toString();
    }

    if (natDexNumber >=10 && natDexNumber < 100)
    {
      return "0" + natDexNumber.toString();
    }

    return natDexNumber;
  }

  getGameExistance(listItem)
  {
    if (listItem.Sword === "Sword")
      return '#00a1e6';

    if (listItem.Shield === "Shield")
      return '#ee0057';

    return '#e8e8e8';
  }

_keyExtractor = (item, index) => item.Pokemon;

  render() {
    if (this.props.isLoading) {
      return (
        <View>
          <ActivityIndicator size="small" style={{marginTop: 15}}/>
        </View>
      );
    }

    return (
      <View>
        <FlatList contentContainerStyle={{ paddingBottom: this.props.bottomPadding}}
          data={this.props.listData}
          keyExtractor={this._keyExtractor}
          renderItem={({item, index}) => <PokedexListItem pokemonNumber={item.Number} pokemonName={item.Pokemon} pokemonType={item.Type} pokemonSubType={item.SubType}
            pokemonEvolution={item.Evolution} itemIndex={this.getIconNumber(item.NationalDexNumber, index)}
            existsIn={this.getGameExistance(item)} pokemonLocations={item.Found} pokemonWeather={item.Weather}/> }
          />
      </View>
    );
  }
}
