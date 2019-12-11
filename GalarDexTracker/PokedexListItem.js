import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Platform, TouchableOpacity, AsyncStorage, Linking } from 'react-native';
import Collapsible from 'react-native-collapsible';

export default class PokedexListItem extends Component {
  _isMounted = false;

  constructor() {
  super();
   this.state = {
     caught: false,
     shiny: false,
   }
}

  componentDidMount = async ()=>{
    this._isMounted = true;

    let caughtStatus = await AsyncStorage.getItem(this.props.pokemonName + 'CaughtStatus');
    let shinyStatus = await AsyncStorage.getItem(this.props.pokemonName + 'ShinyStatus');

    if (caughtStatus === 'true')
    {
      this._isMounted && this.setState({
        caught: !this.state.caught
      })
    }

    if (shinyStatus === 'true')
    {
      this._isMounted && this.setState({
        shiny: !this.state.shiny
      })
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onCaughtPress = async ()=> {
      this.setState({
        caught: !this.state.caught
      })

      AsyncStorage.setItem(this.props.pokemonName + 'CaughtStatus', (!this.state.caught).toString());
    }

  onShinyPress = async ()=>{
      this.setState({
        shiny: !this.state.shiny
      })

      AsyncStorage.setItem(this.props.pokemonName + 'ShinyStatus', (!this.state.shiny).toString());
    }

    getIconPathNumber(number) {
      if(number === '077' || number === '078')
        return number + '-g';

      return number;
    }


  render() {
    const IconPathNumber = this.props.itemIndex;
    const IconPath = {uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(IconPathNumber) + '.png'};

    const HasCaught = false;

    return (
      <View style={styles.listitembackground}>
        <Text style={styles.dexnumber}># {this.props.pokemonNumber}</Text>
        <TouchableOpacity style={{flexDirection: 'row'}}
          onPress={ ()=>{ Linking.openURL('https://www.serebii.net/pokedex-swsh/'+ this.props.pokemonName.toLowerCase() + '/')}}>
          <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
            source={IconPath}/>
          <Text style={styles.dexname}>{this.props.pokemonName}</Text>
        </TouchableOpacity>

        <View style={styles.togglescontainer}>
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.onCaughtPress}>
              <View style={styles.toggles}>
                  <Image style={[styles.pokeballicon, this.state.caught ? styles.caughtpokemon : styles.uncaughtpokemon]} resizeMode={'contain'}
                    source={{uri: 'https://www.serebii.net/itemdex/sprites/pokeball.png'}}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onShinyPress}>
              <View style={styles.toggles}>
                  <Image style={[styles.shinyicon, this.state.shiny ? styles.caughtshiny : styles.noshiny]} resizeMode={'contain'}
                    source={{uri: 'https://cdn.bulbagarden.net/upload/8/82/ShinyLGPEStar.png'}}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignSelf: 'flex-start', marginTop: -5, marginRight: -5}}>
          <View style={{borderRadius: 5, width: 10, height: 10, backgroundColor: this.props.existsIn,}}>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listitembackground: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    padding: 10,
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  togglescontainer: {
    flex: 1,
    height: 58,
    marginTop: -10,
    marginBottom: -10,
    marginLeft: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'stretch'
  },
  pokeballicon: {
    width: 24,
    height: 24,
  },
  caughtpokemon: {
    opacity: 1.0,
  },
  uncaughtpokemon: {
    opacity: 0.5,
    tintColor: 'gray',
  },
  shinyicon: {
    width: 24,
    height: 24,
  },
  caughtshiny: {
    opacity: 1.0,
  },
  noshiny: {
    tintColor: 'gray',
    opacity: 0.5,
  },
  toggles: {
    width: 30,
    marginLeft: 5,
    marginRight: -5,
    alignContent: 'stretch',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 58,
  },
  dexnumber: {
    color: '#737373',
    fontStyle: 'italic'
  },
  dexname: {
    marginLeft: 5,
    marginTop: 10,
    fontWeight: 'bold'
  },
  swordicon: {
  },
});
