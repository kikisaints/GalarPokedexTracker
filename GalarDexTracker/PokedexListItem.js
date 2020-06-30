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
     pokemonEvoNameOne: "",
     pokemonEvoNameTwo: "",
     pokemonEvoNameThree: "",
     pokemonEvoNameFour: "",
     pokemonEvoNameFive: "",
     pokemonEvoNameSix: "",
     pokemonEvoNameSeveon: "",
     pokemonEvoNameEight: "",
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

  showNoEffectAlert = () => {
    Alert.alert(
      'No Effect Against',
      'The following types',
      [
        {text: 'OK'},
      ],
      {cancelable: false},
    );
  }

  showStrengthAlert = () => {
    Alert.alert(
      'Strong Against',
      'The following types',
      [
        {text: 'OK'},
      ],
      {cancelable: false},
    );
  }

  showWeaknessAlert = () => {
    Alert.alert(
      'Weak To',
      'The following types',
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
    const IconEvoNumber1 = this.props.itemIndex1;
    const IconEvoNumber2 = this.props.itemIndex2;
    const IconEvoNumber3 = this.props.itemIndex3;

    const MainType = this.props.pokemonType.toLowerCase();
    const SubType = this.props.pokemonSubType.toLowerCase();
    const IconPath = {uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(IconPathNumber) + '.png'};

    const IconPath1 = {uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(IconEvoNumber1) + '.png'};
    const IconPath2 = {uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(IconEvoNumber2) + '.png'};
    const IconPath3 = {uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(IconEvoNumber3) + '.png'};

    const HasCaught = false;

    var evuolution1Info = null;
    if (this.props.firstEvolution != "")
    {
      evuolution1Info = (
          <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'} source={IconPath1}/>
            <Text style={{fontWeight: 'bold'}}>{this.props.firstEvolution}</Text>
            <Text style={{fontStyle: 'italic', fontSize: 12}}>{this.props.firstEvoRequirement}</Text>
          </View>
      );
    }

    var evuolution2Info = null;

    if (this.props.secondEvolution != "" && (this.props.pokemonName === "Kirlia" || this.props.pokemonName === "Oddish"
        || this.props.pokemonName === "Gloom" || this.props.pokemonName === "Ralts"))
    {
      evuolution2Info = (
        <View style={{flexDirection: 'row'}}>
          <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
          <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'} source={IconPath2}/>
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{this.props.secondEvolution}</Text>
            <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{this.props.secondEvoRequirement}</Text>
          </View>
        </View>
      );
    }
    else if (this.props.secondEvolution != "" && this.props.pokemonName != "Eevee" && this.props.pokemonName != "Meowth"
        && this.props.pokemonName != "Applin" && this.props.pokemonName != "Tyrogue" && this.props.pokemonName != "Yamask"
        && this.props.pokemonName != "Snorunt" && this.props.pokemonName != "Nincada" && this.props.pokemonName != "Kirlia")
    {
      evuolution2Info = (
        <View style={{flexDirection: 'row'}}>
          <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
          <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'} source={IconPath2}/>
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{this.props.secondEvolution}</Text>
            <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{this.props.secondEvoRequirement}</Text>
          </View>
        </View>
      );
    }
    else if (this.props.pokemonName === "Eevee" && this.props.secondEvolution != "")
    {
      var res = this.props.secondEvolution.split(", ");
      var iconRes = this.props.itemIndex2.split(", ");
      var evoReqRes = this.props.secondEvoRequirement.split(", ");

      evuolution2Info = (
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={{uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[0]) + '.png'}}/>
                <Text style={{fontWeight: 'bold'}}>{res[0]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[0]}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={{uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[1]) + '.png'}}/>
                <Text style={{fontWeight: 'bold'}}>{res[1]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[1]}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={{uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[2]) + '.png'}}/>
                <Text style={{fontWeight: 'bold'}}>{res[2]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[2]}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={{uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[3]) + '.png'}}/>
                <Text style={{fontWeight: 'bold'}}>{res[3]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[3]}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={{uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[4]) + '.png'}}/>
                <Text style={{fontWeight: 'bold'}}>{res[4]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[4]}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={{uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[5]) + '.png'}}/>
                <Text style={{fontWeight: 'bold'}}>{res[5]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[5]}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={{uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[6]) + '.png'}}/>
                <Text style={{fontWeight: 'bold'}}>{res[6]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[6]}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={{uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[7]) + '.png'}}/>
                <Text style={{fontWeight: 'bold'}}>{res[7]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[7]}</Text>
              </View>
            </View>
        </View>
      );
    }
    else if ((this.props.pokemonName === "Meowth" || this.props.pokemonName === "Applin" ||
              this.props.pokemonName === "Yamask" || this.props.pokemonName === "Snorunt") && this.props.secondEvolution != "")
    {
      var res = this.props.secondEvolution.split(", ");
      var iconRes = this.props.itemIndex2.split(", ");
      var evoReqRes = this.props.secondEvoRequirement.split(", ");

      var secondIconPath = {uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[1]) + '.png'};

      if (this.props.pokemonName === "Meowth")
      {
        secondIconPath = {uri: 'https://www.serebii.net/pokedex-swsh/icon/053.png'};
      }

      evuolution2Info = (
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={{uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[0]) + '.png'}}/>
                <Text style={{fontWeight: 'bold'}}>{res[0]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[0]}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={secondIconPath}/>
                <Text style={{fontWeight: 'bold'}}>{res[1]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[1]}</Text>
              </View>
            </View>
          </View>
      );
    }
    else if (this.props.pokemonName === "Tyrogue" && this.props.secondEvolution != "")
    {
      var res = this.props.secondEvolution.split(", ");
      var iconRes = this.props.itemIndex2.split(", ");
      var evoReqRes = this.props.secondEvoRequirement.split(", ");

      evuolution2Info = (
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={{uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[0]) + '.png'}}/>
                <Text style={{fontWeight: 'bold'}}>{res[0]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[0]}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={{uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[1]) + '.png'}}/>
                <Text style={{fontWeight: 'bold'}}>{res[1]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[1]}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={{uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[2]) + '.png'}}/>
                <Text style={{fontWeight: 'bold'}}>{res[2]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[2]}</Text>
              </View>
            </View>
          </View>
      );
    }
    else if ((this.props.pokemonName === "Nincada") && this.props.secondEvolution != "")
    {
      var res = this.props.secondEvolution.split(", ");
      var iconRes = this.props.itemIndex2.split(", ");
      var evoReqRes = this.props.secondEvoRequirement.split(", ");

      evuolution2Info = (
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={{uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[0]) + '.png'}}/>
                <Text style={{fontWeight: 'bold'}}>{res[0]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[0]}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={{uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[1]) + '.png'}}/>
                <Text style={{fontWeight: 'bold'}}>{res[1]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[1]}</Text>
              </View>
            </View>
          </View>
      );
    }

    var evuolution3Info = null;
    if (this.props.thirdEvolution != "" && this.props.pokemonName != "Gloom" && this.props.pokemonName != "Oddish" && this.props.pokemonName != "Ralts" &&
        this.props.pokemonName != "Kirlia")
    {
      evuolution3Info = (
        <View style={{flexDirection: 'row'}}>
          <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
          <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'} source={IconPath3}/>
            <Text style={{fontWeight: 'bold'}}>{this.props.thirdEvolution}</Text>
            <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{this.props.thirdEvoRequirement}</Text>
          </View>
        </View>
      );
    }
    else if (this.props.thirdEvolution != "" && (this.props.pokemonName != "Gloom" || this.props.pokemonName != "Oddish" ||
             this.props.pokemonName === "Ralts" || this.props.pokemonName === "Kirlia"))
    {
      var res = this.props.thirdEvolution.split(", ");
      var iconRes = this.props.itemIndex3.split(", ");
      var evoReqRes = this.props.thirdEvoRequirement.split(", ");

      var iconSource = {uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[0]) + '.png'};

      if (this.props.pokemonName === "Gloom" || this.props.pokemonName === "Oddish")
      {
        iconSource = {uri : 'https://www.serebii.net/pokedex-swsh/icon/045.png'};
      }

      evuolution3Info = (
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={iconSource}/>
                <Text style={{fontWeight: 'bold'}}>{res[0]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[0]}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image style={{width: 20, height: 20, marginTop: 25}} resizeMode={'contain'} source={require('./assets/evolution_icon.png')}/>
              <View style={{flexDirection: 'column', padding: 5, margin: 5, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
                source={{uri: 'https://www.serebii.net/pokedex-swsh/icon/' + this.getIconPathNumber(iconRes[1]) + '.png'}}/>
                <Text style={{fontWeight: 'bold'}}>{res[1]}</Text>
                <Text style={{fontStyle: 'italic', fontSize: 12, textAlign: 'center'}}>{evoReqRes[1]}</Text>
              </View>
            </View>
          </View>
      );
    }

    var pokemonInfo = null;
    if (this.state.showInfo)
    {
      pokemonInfo = (
        <View style={styles.subitemInfobackground}>
          <View style={{flexDirection: 'column', alignSelf: 'stretch', alignContent: 'stretch'}}>

          <View style={{flexDirection: 'row', marginBottom: 10, marginTop: -15}}>
            <View style={styles.UpArrow}/>
            <TouchableOpacity onPress={this.showStrengthAlert}>
              <TypeTagList ShowWeakness={false} ShowNoEffect={false} PrimaryType={MainType.toLowerCase()} SecondaryType={SubType.toLowerCase()}/>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row',  marginBottom: 5}}>
            <View style={styles.DownArrow}/>
            <TouchableOpacity onPress={this.showWeaknessAlert}>
              <TypeTagList ShowWeakness={true} ShowNoEffect={false} PrimaryType={MainType.toLowerCase()} SecondaryType={SubType.toLowerCase()}/>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row',  marginBottom: 20}}>
            <View style={styles.NeutralArrow}/>
            <TouchableOpacity onPress={this.showNoEffectAlert}>
              <TypeTagList ShowNoEffect={true} ShowWeakness={false} PrimaryType={MainType.toLowerCase()} SecondaryType={SubType.toLowerCase()}/>
            </TouchableOpacity>
          </View>

            <View style={{flex: 1, flexDirection: 'row', marginBottom: 10, alignSelf: 'stretch', alignContent: 'stretch', marginTop: -15, justifyContent: 'stretch'}}>
              <View style={{alignItems: 'center', justifyContent: 'center', margin: 2}}>
                <View style={{backgroundColor: '#e8e8e8', borderRadius: 10}}>
                  <Text style={{padding: 3, fontWeight: 'bold'}}>HP</Text>
                </View>
                <Text style={{fontSize: 12, padding: 3, borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 10}}>{this.props.Health}</Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center', margin: 5}}>
                <View style={{backgroundColor: '#e8e8e8', borderRadius: 10}}>
                  <Text style={{padding: 3, fontWeight: 'bold'}}>ATK</Text>
                </View>
                <Text style={{fontSize: 12, padding: 3, borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 10}}>{this.props.Attack}</Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center', margin: 2}}>
                <View style={{backgroundColor: '#e8e8e8', borderRadius: 10}}>
                  <Text style={{padding: 3, fontWeight: 'bold'}}>DEF</Text>
                </View>
                <Text style={{fontSize: 12, padding: 3, borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 10}}>{this.props.Defense}</Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center', margin: 2}}>
                <View style={{backgroundColor: '#e8e8e8', borderRadius: 10}}>
                  <Text style={{padding: 3, fontWeight: 'bold'}}>Sp.ATK</Text>
                </View>
                <Text style={{fontSize: 12, padding: 3, borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 10}}>{this.props.SpecialAttack}</Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center', margin: 2}}>
                <View style={{backgroundColor: '#e8e8e8', borderRadius: 10}}>
                  <Text style={{padding: 3, fontWeight: 'bold'}}>Sp.DEF</Text>
                </View>
                <Text style={{fontSize: 12, padding: 3, borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 10}}>{this.props.SpecialDefense}</Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center', margin: 2}}>
                <View style={{backgroundColor: '#e8e8e8', borderRadius: 10}}>
                  <Text style={{padding: 3, fontWeight: 'bold'}}>Speed</Text>
                </View>
                <Text style={{fontSize: 12, padding: 3, borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 10}}>{this.props.Speed}</Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center', margin: 2}}>
                <View style={{backgroundColor: '#e8e8e8', borderRadius: 10}}>
                  <Text style={{padding: 3, fontWeight: 'bold'}}>Total</Text>
                </View>
                <Text style={{fontSize: 12, padding: 3, borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 10}}>{this.props.TotalStats}</Text>
              </View>
            </View>

            <View style={{backgroundColor: '#efefef', height: 1, alignItems: 'stretch'}}/>

              <View style={{flexDirection: 'row'}}>
                  {evuolution1Info}
                  {evuolution2Info}
                  {evuolution3Info}
              </View>

              <Image style={{width: 15, height: 20, marginTop: 10, marginBottom: 5}} resizeMode={'contain'} source={require('./assets/location_icon.png')}/>
              <Text>{this.props.pokemonLocations}</Text>

              <Image style={{width: 15, height: 20, marginTop: 10, marginBottom: 5}} resizeMode={'contain'} source={require('./assets/weather_icon.png')}/>
              <Text>{this.props.pokemonWeather}</Text>

              <TouchableOpacity onPress={() => Linking.openURL('https://www.serebii.net/pokedex-swsh/' + this.props.pokemonName.toLowerCase() + "/")}>
                <Text style={{fontSize: 13, marginTop: 10, marginBottom: 4, color: 'blue', fontWeight: 'bold'}}>More Info (Serebii)</Text>
              </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View>
      <View style={[styles.listitembackground, this.state.showInfo ? styles.listitembackgroundPokeInfoShowing : styles.listitembackground]}>
        <Text style={styles.dexnumber}># {this.props.pokemonNumber}</Text>
        <TouchableOpacity style={{flexDirection: 'row'}}
          onPress={this.onPokemonPress}>
          <Image style={{marginLeft: 5, maxWidth: 60, maxHeight: 60, minWidth: 32, minHeight: 32}} resizeMode={'contain'}
            source={IconPath}/>
          <Text style={styles.dexname}>{this.props.pokemonName}</Text>
        </TouchableOpacity>

        <View style={styles.togglescontainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <TypeTag style={{marginRight: 8}} Type={MainType.toLowerCase()}/>
              <TypeTag Type={SubType.toLowerCase()}/>
            </View>
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
        <View style={{alignSelf: 'flex-start', marginTop: -5, marginRight: 5}}>
          <View style={{borderRadius: 5, width: 10, height: 10, backgroundColor: this.props.existsIn,}}>
          </View>
        </View>
      </View>

      <View style={{flex: 1, alignItems: 'stretch', alignContent: 'stretch'}}>
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
  NeutralArrow: {
    width: 10,
    height: 3,
    marginRight: 8,
    marginTop: 3,
    backgroundColor: '#7d7d7d',
    shadowColor: 'rgba(0, 0, 0, 0.75)',
    shadowOffset: {width: -1, height: 1},
    shadowRadius: 1,
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
  listitembackgroundPokeInfoShowing: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#dbdbdb',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    padding: 10,
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  listitembackground: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 30,
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
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#dbdbdb',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
