import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import TypeTag  from './TypeTag';
const swchart = require('./assets/strengthweaknesschart.json');

export default class PokedexList extends Component {
  _isMounted = false;

  constructor() {
    super();
    this.state = {
      TypePropOne: "",
      TypePropTwo: "",
      TypePropThree: "",
      TypePropFour: "",
      TypePropFive: "",
      TypePropSix: "",
      TypePropSeven: "",
      mod1: "",
      mod2: "",
      mod3: "",
      mod4: "",
      mod5: "",
      mod6: "",
      mod7: "",
    }
  }

  componentDidMount = async ()=>{

    if (this._isMounted === false)
    {
      this.SetUpStrengthsWeaknesses();
    }

    this._isMounted = true;
  }

  SetTypeTags(one, two, three, four, five, six, seven)
  {
    this.setState({
      TypePropOne: one,
      TypePropTwo: two,
      TypePropThree: three,
      TypePropFour: four,
      TypePropFive: five,
      TypePropSix: six,
      TypePropSeven: seven
    })
  }

  SetFXMods(one, two, three, four, five, six, seven)
  {
    if (one != "") this.setState({ mod1: "x" + one })
    if (two != "") this.setState({ mod2: "x" + one })
    if (three != "") this.setState({ mod3: "x" + one })
    if (four != "") this.setState({ mod4: "x" + one })
    if (five != "") this.setState({ mod5: "x" + one })
    if (six != "") this.setState({ mod6: "x" + one })
    if (seven != "") this.setState({ mod7: "x" + one })
  }

  SetUpStrengthsWeaknesses()
  {
    var maintype = this.props.PrimaryType;
    var subtype = this.props.SecondaryType;
    var showweakness = this.props.ShowWeakness;
    var showNoEffect = this.props.ShowNoEffect;

    var typeValOne = "";
    var typeValTwo = "";
    var typeValThree = "";
    var typeValFour = "";
    var typeValFive = "";
    var typeValSix = "";
    var typeValSeven = "";

    var modeval1 = "";
    var modeval2 = "";
    var modeval3 = "";
    var modeval4 = "";
    var modeval5 = "";
    var modeval6 = "";
    var modeval7 = "";

    var maintypechart = swchart[maintype.toString()];
    var subtypechart = swchart[subtype.toString()];

    //Not a dual type
    var counter = 0;

    for (let i = 0; i < 18; i++)
    {
      var typeval = "";
      var currentval = "";
      if (i === 0) currentval = "normal";
      if (i === 1) currentval = "fighting";
      if (i === 2) currentval = "flying";
      if (i === 3) currentval = "poison";
      if (i === 4) currentval = "ground";
      if (i === 5) currentval = "rock";
      if (i === 6) currentval = "bug";
      if (i === 7) currentval = "ghost";
      if (i === 8) currentval = "steel";
      if (i === 9) currentval = "fire";
      if (i === 10) currentval = "water";
      if (i === 11) currentval = "grass";
      if (i === 12) currentval = "electric";
      if (i === 13) currentval = "psychic";
      if (i === 14) currentval = "ice";
      if (i === 15) currentval = "dragon";
      if (i === 16) currentval = "dark";
      if (i === 17) currentval = "fairy";

      var multiplier = maintypechart[currentval];

      if (this.props.SecondaryType !== "" && this.props.PrimaryType !== "")
      {
        multiplier = maintypechart[currentval] * subtypechart[currentval];
      }

      if ((multiplier > 1 && showweakness && !showNoEffect) ||
          (multiplier < 1 && !showweakness && multiplier > 0 && !showNoEffect) ||
          (multiplier === 0 && showNoEffect && !showweakness))
      {
        typeval = currentval;

        if (multiplier === 0)
        {
          multiplier = "0";
        }

        if (counter === 0){ typeValOne = typeval; modeval1 = multiplier; }
        if (counter === 1){ typeValTwo = typeval; modeval2 = multiplier; }
        if (counter === 2){ typeValThree = typeval; modeval3 = multiplier; }
        if (counter === 3){ typeValFour = typeval; modeval4 = multiplier; }
        if (counter === 4){ typeValFive = typeval; modeval5 = multiplier; }
        if (counter === 5){ typeValSix = typeval; modeval6 = multiplier; }
        if (counter === 6){ typeValSeven = typeval; modeval7 = multiplier; }

        counter++;
      }

      if (counter >= 7)
        break;
    }

    this.SetTypeTags(typeValOne, typeValTwo, typeValThree, typeValFour,
      typeValFive, typeValSix, typeValSeven);
    this.SetFXMods(modeval1, modeval2, modeval3, modeval4,
      modeval5, modeval6, modeval7);
  }

  resetTypes() {
    typeValOne = "";
    typeValTwo = "";
    typeValThree = "";
    typeValFour = "";
    typeValFive = "";
    typeValSix = "";
    typeValSeven = "";
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TypeTag IsWeaknessTag={this.props.ShowWeakness} Type={this.state.TypePropOne} TypeFXMod={this.state.mod1}/>
        <TypeTag IsWeaknessTag={this.props.ShowWeakness} Type={this.state.TypePropTwo} TypeFXMod={this.state.mod2}/>
        <TypeTag IsWeaknessTag={this.props.ShowWeakness} Type={this.state.TypePropThree} TypeFXMod={this.state.mod3}/>
        <TypeTag IsWeaknessTag={this.props.ShowWeakness} Type={this.state.TypePropFour} TypeFXMod={this.state.mod4}/>
        <TypeTag IsWeaknessTag={this.props.ShowWeakness} Type={this.state.TypePropFive} TypeFXMod={this.state.mod5}/>
        <TypeTag IsWeaknessTag={this.props.ShowWeakness} Type={this.state.TypePropSix} TypeFXMod={this.state.mod6}/>
        <TypeTag IsWeaknessTag={this.props.ShowWeakness} Type={this.state.TypePropSeven} TypeFXMod={this.state.mod7}/>
        <Text> {swchart[this.props.PrimaryType.toString()].length} </Text>
      </View>
    );
  }
}
