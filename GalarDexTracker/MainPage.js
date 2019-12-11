import React, { Component } from 'react';
import { StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  TextInput,
  Alert,
  AsyncStorage } from 'react-native';
import Collapsible from 'react-native-collapsible';

const Pokedex = require('./assets/galarianpokedex.json');
import PokedexList  from './PokedexList';

export default class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      search: true,
      switchSwordValue: false,
      switchShieldValue: false,
      data: Pokedex,
      filterData: Pokedex,
      caughtData: {},
      showCaughtValue: false,
      showShinyValue: false,
      showUncaughtValue: false,
      refreshingList: false,
    }
  }

  toggleSearchInfo = () => {
    this.setState({ search : !this.state.search })
    this.setState({ filter : true })
    this.setState({ text : '' })
  }

  showSearchHelpAlert = () => {
    Alert.alert(
      'Search Tips',
      '\nPokemon name or number\n\nTry #Grass, or #Dragon#Ghost for dual type searches\n\n@Sword or @Shield to see only Pokemon from those games\n\nType ! to see caught, ? to see remaining, and * to see shiny Pokemon',
      [
        {text: 'Got it'},
      ],
      {cancelable: false},
    );
  }

  showAboutAlert = () => {
    Alert.alert(
      'About',
      'Pokémon and All Respective Names are Trademark & © of Nintendo 1996 - ' + new Date().getFullYear().toString() + '\nApp is © Copyright by Kiki Saintonge',
      [
        {text: 'Close'},
      ],
      {cancelable: false},
    );
  }

  searchFilterFunction = async (text) => {

    this.setState({
      text: text,
      refreshingList: true
    });

    if (text === "*")
    {
      var shinyPokemon = [];
      for (var key in this.state.data)
      {
        if (this.state.data.hasOwnProperty(key))
        {
          let shinyStatus = await AsyncStorage.getItem(this.state.data[key].Pokemon + 'ShinyStatus');

          if(shinyStatus === 'true')
          {
            shinyPokemon.push(this.state.data[key]);
          }
        }
      }

      const newData = shinyPokemon;

      this.setState({
        data: newData
      });
    }
    else if (text === "!")
    {
      var caughtPokemon = [];
      for (var key in this.state.data)
      {
        if (this.state.data.hasOwnProperty(key))
        {
          let caughtStatus = await AsyncStorage.getItem(this.state.data[key].Pokemon + 'CaughtStatus');

          if(caughtStatus === 'true')
          {
            caughtPokemon.push(this.state.data[key]);
          }
        }
      }

      const newData = caughtPokemon;

      this.setState({
        data: newData
      });
    }
    else if (text === "?")
    {
      var uncaughtPokemon = [];
      for (var key in this.state.data)
      {
        if (this.state.data.hasOwnProperty(key))
        {
          let caughtStatus = await AsyncStorage.getItem(this.state.data[key].Pokemon + 'CaughtStatus');

          if(caughtStatus === 'true')
          {
            continue;
          }
          uncaughtPokemon.push(this.state.data[key]);
        }
      }

      const newData = uncaughtPokemon;

      this.setState({
        data: newData
      });
    }
    else if (text[0] !== '#' && text[0] !== '@')
    {
        const newData = this.state.filterData.filter(function(item) {
        const itemData = `${item.Pokemon ? item.Pokemon.toUpperCase() : ''.toUpperCase()},
        ${(item.Number).toString() ? (item.Number).toString().toUpperCase() : ''.toUpperCase()}`;

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      this.setState({
        data: newData
      });
    }
    else if (text[0] === '#')
    {
        const newData = this.state.filterData.filter(function(item) {
        const itemData = `${'#' + item.Type ? item.Type.toUpperCase() : ''.toUpperCase()},
        ${'#' + item.SubType ? '#' + item.SubType.toUpperCase() : ''.toUpperCase()}
        ${'#' + item.Type + "#" + item.SubType? '#' + item.Type.toUpperCase() + "#" + item.SubType.toUpperCase(): ''.toUpperCase()}`;

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      this.setState({
        data: newData
      });
    }
    else if (text[0] === '@')
    {
        const newData = this.state.filterData.filter(function(item) {
        const itemData = `${'@' + item.Sword ? '@' + item.Sword.toUpperCase() : ''.toUpperCase()},
        ${'@' + item.Shield ? '@' + item.Shield.toUpperCase() : ''.toUpperCase()}`;

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      this.setState({
        data: newData
      });
    }

    if (text.toUpperCase() === "@SWORD!" || text.toUpperCase() === "@SHIELD!")
    {
      const newData = this.state.filterData.filter(function(item) {
        const itemData = `${'@' + item.Sword + '!' ? '@' + item.Sword.toUpperCase() + '!' : ''.toUpperCase()},
        ${'@' + item.Shield + '!' ? '@' + item.Shield.toUpperCase() + '!' : ''.toUpperCase()}`;

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      var caughtPokemon = [];
      for (var key in newData)
      {
        if (newData.hasOwnProperty(key))
        {
          let caughtStatus = await AsyncStorage.getItem(newData[key].Pokemon + 'CaughtStatus');

          if(caughtStatus === 'true')
          {
            caughtPokemon.push(newData[key]);
          }
        }
      }

      const finalData = caughtPokemon;

      this.setState({
        data: finalData
      });
    }

    if (text.toUpperCase() === "@SWORD?" || text.toUpperCase() === "@SHIELD?")
    {
      const newData = this.state.filterData.filter(function(item) {
        const itemData = `${'@' + item.Sword + '?' ? '@' + item.Sword.toUpperCase() + '?' : ''.toUpperCase()},
        ${'@' + item.Shield + '?' ? '@' + item.Shield.toUpperCase() + '?' : ''.toUpperCase()}`;

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      var caughtPokemon = [];
      for (var key in newData)
      {
        if (newData.hasOwnProperty(key))
        {
          let caughtStatus = await AsyncStorage.getItem(newData[key].Pokemon + 'CaughtStatus');

          if(caughtStatus === 'true')
          {
            continue;
          }
          caughtPokemon.push(newData[key]);
        }
      }

      const finalData = caughtPokemon;

      this.setState({
        data: finalData
      });
    }

    if (text.toUpperCase() === "@SWORD*" || text.toUpperCase() === "@SHIELD*")
    {
      const newData = this.state.filterData.filter(function(item) {
        const itemData = `${'@' + item.Sword + '*' ? '@' + item.Sword.toUpperCase() + '*' : ''.toUpperCase()},
        ${'@' + item.Shield + '*' ? '@' + item.Shield.toUpperCase() + '*' : ''.toUpperCase()}`;

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      var caughtPokemon = [];
      for (var key in newData)
      {
        if (newData.hasOwnProperty(key))
        {
          let shinyStatus = await AsyncStorage.getItem(newData[key].Pokemon + 'ShinyStatus');

          if(shinyStatus === 'true')
          {
            caughtPokemon.push(newData[key]);
          }
        }
      }

      const finalData = caughtPokemon;

      this.setState({
        data: finalData
      });
    }

    if (text[0] === '#' && text[text.length - 1] === '!')
    {
      text = text.substring(0, text.length - 1);
      const newData = this.state.filterData.filter(function(item) {
        const itemData = `${'#' + item.Type ? item.Type.toUpperCase() : ''.toUpperCase()},
        ${'#' + item.SubType ? '#' + item.SubType.toUpperCase() : ''.toUpperCase()}
        ${'#' + item.Type + "#" + item.SubType ? '#' + item.Type.toUpperCase() + "#" + item.SubType.toUpperCase() : ''.toUpperCase()}`;

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      var caughtPokemon = [];
      for (var key in newData)
      {
        if (newData.hasOwnProperty(key))
        {
          let caughtStatus = await AsyncStorage.getItem(newData[key].Pokemon + 'CaughtStatus');

          if(caughtStatus === 'true')
          {
            caughtPokemon.push(newData[key]);
          }
        }
      }

      const finalData = caughtPokemon;
      this.setState({
        data: finalData
      });
    }

    if (text[0] === '#' && text[text.length - 1] === '?')
    {
      text = text.substring(0, text.length - 1);

      const newData = this.state.filterData.filter(function(item) {
        const itemData = `${'#' + item.Type ? item.Type.toUpperCase() : ''.toUpperCase()},
        ${'#' + item.SubType ? '#' + item.SubType.toUpperCase() : ''.toUpperCase()}
        ${'#' + item.Type + "#" + item.SubType ? '#' + item.Type.toUpperCase() + "#" + item.SubType.toUpperCase() : ''.toUpperCase()}`;

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      var caughtPokemon = [];
      for (var key in newData)
      {
        if (newData.hasOwnProperty(key))
        {
          let caughtStatus = await AsyncStorage.getItem(newData[key].Pokemon + 'CaughtStatus');

          if(caughtStatus === 'true')
          {
            continue;
          }
          caughtPokemon.push(newData[key]);
        }
      }

      const finalData = caughtPokemon;
      this.setState({
        data: finalData
      });
    }

    if (text[0] === '#' && text[text.length - 1] === '*')
    {
      text = text.substring(0, text.length - 1);

      const newData = this.state.filterData.filter(function(item) {
        const itemData = `${'#' + item.Type ? item.Type.toUpperCase() : ''.toUpperCase()},
        ${'#' + item.SubType ? '#' + item.SubType.toUpperCase() : ''.toUpperCase()}
        ${'#' + item.Type + "#" + item.SubType ? '#' + item.Type.toUpperCase() + "#" + item.SubType.toUpperCase() : ''.toUpperCase()}`;

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      console.log(newData.length);

      var caughtPokemon = [];
      for (var key in newData)
      {
        if (newData.hasOwnProperty(key))
        {
          let shinyStatus = await AsyncStorage.getItem(newData[key].Pokemon + 'ShinyStatus');
          console.log(shinyStatus);

          if(shinyStatus === 'true')
          {
            caughtPokemon.push(newData[key]);
          }
        }
      }

      const finalData = caughtPokemon;

      this.setState({
        data: finalData
      });
    }

    this.setState({
      refreshingList: false
    });
  }

  getBottomPadding()
  {
    if (this.state.search)
      return 185;

    return 365;
  }

  render() {
    return (
      <View>
        <View style={{backgroundColor: '#a83232', flexDirection: 'column', alignContent: 'stretch', alignItems: 'stretch'}}>
          <TouchableOpacity onPress={this.toggleSearchInfo}
            style={{marginRight: 10, marginBottom: 5, alignSelf: 'flex-end'}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Search</Text>
          </TouchableOpacity>
          <Text style={{color: 'white', marginRight: 10, marginBottom: 10, opacity: 0.6, alignSelf: 'flex-end'}}>Showing {this.state.data.length} / 400</Text>
          <Collapsible collapsed={this.state.search}>
            <View style={{marginBottom: 10, marginLeft: 10, flexDirection: 'column'}}>
              <TextInput
                style={{ height: 35, backgroundColor: '#e8e8e8', marginRight: 10, borderRadius: 4, paddingLeft: 10}}
                onChangeText={text => this.searchFilterFunction(text)}
                value={this.state.text}
                placeholder="Search Pokedex"/>
              <TouchableOpacity onPress={this.showSearchHelpAlert}>
                <Text style={{color: 'white', marginTop: 5}}>How can I filter searches?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.showAboutAlert}>
                <Text style={{color: 'white', marginTop: 10}}>About</Text>
              </TouchableOpacity>
            </View>
          </Collapsible>
        </View>

        <View>
          <PokedexList listData={this.state.data} bottomPadding={this.getBottomPadding()} isLoading={this.state.refreshingList}/>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  filtercontainer: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#6e2020',
    marginLeft: -10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  switchcontainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'stretch'
  },
});
