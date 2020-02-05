import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, AsyncStorage, TouchableOpacity, ActivityIndicator } from 'react-native';
import PokedexListItem  from './PokedexListItem';

export default class PokedexList extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  getIconNumber(natDexNumber)
  {
    if(natDexNumber < 10)
    {
      return "00" + natDexNumber.toString();
    }

    if (natDexNumber >= 10 && natDexNumber < 100)
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
            pokemonEvolution={item.Evolution} itemIndex={this.getIconNumber(item.NationalDexNumber)}
            itemIndex1={this.getIconNumber(item.DexEvoOne)} itemIndex2={this.getIconNumber(item.DexEvoTwo)} itemIndex3={this.getIconNumber(item.DexEvoThree)}
            existsIn={this.getGameExistance(item)} pokemonLocations={item.Found} pokemonWeather={item.Weather}
            firstEvolution={item.Evolution1} secondEvolution={item.Evolution2} thirdEvolution={item.Evolution3}
            firstEvoRequirement={item.Trigger1} secondEvoRequirement={item.Trigger2} thirdEvoRequirement={item.Trigger}
            Health={item.HP} Attack={item.ATK} Defense={item.DEF} SpecialAttack={item.SpATK} SpecialDefense={item.SpDEF} Speed={item.Speed} TotalStats={item.Total}/> }
          />
      </View>
    );
  }
}
