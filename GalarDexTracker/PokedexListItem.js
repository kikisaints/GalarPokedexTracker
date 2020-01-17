import React, { Component, PureComponent } from 'react';
import { Text, View, StyleSheet, Image, Platform, TouchableOpacity, AsyncStorage, Linking, Alert } from 'react-native';
import Collapsible from 'react-native-collapsible';
import TypeTagList  from './TypeTagList';
import TypeTag  from './TypeTag';

export default class PokedexListItem extends PureComponent {
  _isMounted = false;

  constructor() {
  super();
   this.state = {
     caught: false,
     shiny: false,
     showInfo: false,
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

  showStrengthAlert = () => {
    Alert.alert(
      'Super Effective!',
      'Against the following types',
      [
        {text: 'OK'},
      ],
      {cancelable: false},
    );
  }

  showWeaknessAlert = () => {
    Alert.alert(
      'Not Very Effective...',
      'Against the following types',
      [
        {text: 'OK'},
      ],
      {cancelable: false},
    );
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

    onPokemonPress = async ()=>{
        this.setState({
          showInfo: !this.state.showInfo
        })
      }

    getIconPathNumber(number) {
      if(number === '077' || number === '078')
        return number + '-g';

      return number;
    }

  render() {
    const IconPathNumber = this.props.itemIndex;
    const MainType = this.props.pokemonType.toLowerCase();
    const SubType = this.props.pokemonSubType.toLowerCase();
    const IconPath = {uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(IconPathNumber) + '.png'};

    const HasCaught = false;

    var pokemonInfo = null;
    if (this.state.showInfo)
    {
      pokemonInfo = (
        <View style={styles.subitemInfobackground}>
          <View style={{flexDirection: 'column'}}>

            <View style={{flexDirection: 'row'}}>
              <TypeTag style={{marginRight: 8}} Type={MainType.toLowerCase()}/>
              <TypeTag Type={SubType.toLowerCase()}/>
            </View>

              <View style={{flexDirection: 'row', marginTop: 10}}>
                <View style={styles.UpArrow}/>
                <TouchableOpacity onPress={this.showStrengthAlert}>
                  <TypeTagList ShowWeakness={false} PrimaryType={MainType.toLowerCase()} SecondaryType={SubType.toLowerCase()}/>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row',  marginTop: 5}}>
                <View style={styles.DownArrow}/>
                <TouchableOpacity onPress={this.showWeaknessAlert}>
                  <TypeTagList ShowWeakness={true} PrimaryType={MainType.toLowerCase()} SecondaryType={SubType.toLowerCase()}/>
                </TouchableOpacity>
              </View>

              <Text style={{fontSize: 13, marginTop: 10, fontWeight: 'bold', marginBottom: 4}}>Evolution</Text>
              <Text>{this.props.pokemonEvolution}</Text>

              <Text style={{fontSize: 13, marginTop: 10, fontWeight: 'bold', marginBottom: 4}}>Locations</Text>
              <Text>{this.props.pokemonLocations}</Text>

              <Text style={{fontSize: 13, marginTop: 10, fontWeight: 'bold', marginBottom: 4}}>Weather</Text>
              <Text>{this.props.pokemonWeather}</Text>
          </View>
        </View>
      );
    }

    return (
      <View>
      <View style={styles.listitembackground}>
        <Text style={styles.dexnumber}># {this.props.pokemonNumber}</Text>
        <TouchableOpacity style={{flexDirection: 'row'}}
          onPress={this.onPokemonPress}>
          <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
            source={IconPath}/>
          <Text style={styles.dexname}>{this.props.pokemonName}</Text>
        </TouchableOpacity>

        <View style={styles.togglescontainer}>
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.onCaughtPress}>
              <View style={styles.toggles}>
                  <Image style={[styles.pokeballicon, this.state.caught ? styles.caughtpokemon : styles.uncaughtpokemon]} resizeMode={'contain'}
                    source={require('./assets/pokeball.png')}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onShinyPress}>
              <View style={styles.toggles}>
                  <Image style={[styles.shinyicon, this.state.shiny ? styles.caughtshiny : styles.noshiny]} resizeMode={'contain'}
                    source={require('./assets/shinystar.png')}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignSelf: 'flex-start', marginTop: -5, marginRight: -5}}>
          <View style={{borderRadius: 5, width: 10, height: 10, backgroundColor: this.props.existsIn,}}>
          </View>
        </View>
      </View>

      <View>
        {pokemonInfo}
      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  hiddenInfo: {
    height: 0,
    width: 0,
  },
  UpArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#2f912d',
    marginRight: 8,
    marginTop: 3,
    shadowColor: 'rgba(0, 0, 0, 0.75)',
    shadowOffset: {width: -1, height: 1},
    shadowRadius: 1,
  },
  DownArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#d42c32',
    marginRight: 8,
    marginTop: 3,
    shadowColor: 'rgba(0, 0, 0, 0.75)',
    shadowOffset: {width: -1, height: 1},
    shadowRadius: 1,
  },
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
  subitemInfobackground: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 15,
    marginTop: -4,
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
    width: 28,
    height: 28,
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
