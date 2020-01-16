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

  SetUpStrengthsWeaknesses()
  {
    var maintype = this.props.PrimaryType;
    var subtype = this.props.SecondaryType;
    var showweakness = this.props.ShowWeakness;

    var typeValOne = "";
    var typeValTwo = "";
    var typeValThree = "";
    var typeValFour = "";
    var typeValFive = "";
    var typeValSix = "";
    var typeValSeven = "";

    var maintypechart = swchart[maintype.toString()];
    var subtypechart = swchart[subtype.toString()];

    //Not a dual type
    var counter = 0;

    for (i = 0; i < 18; i++)
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

      console.log(currentval + ": " + multiplier);

      if (multiplier > 1 && showweakness)
      {
        typeval = currentval;

        if (counter === 0) typeValOne = typeval;
        if (counter === 1) typeValTwo = typeval;
        if (counter === 2) typeValThree = typeval;
        if (counter === 3) typeValFour = typeval;
        if (counter === 4) typeValFive = typeval;
        if (counter === 5) typeValSix = typeval;
        if (counter === 6) typeValSeven = typeval;

        counter++;
      }
      else if (multiplier < 1 && !showweakness)
      {
        typeval = currentval;

        if (counter === 0) typeValOne = typeval;
        if (counter === 1) typeValTwo = typeval;
        if (counter === 2) typeValThree = typeval;
        if (counter === 3) typeValFour = typeval;
        if (counter === 4) typeValFive = typeval;
        if (counter === 5) typeValSix = typeval;
        if (counter === 6) typeValSeven = typeval;

        counter++;
      }

      if (counter >= 7)
        break;
    }

    this.SetTypeTags(typeValOne, typeValTwo, typeValThree, typeValFour,
      typeValFive, typeValSix, typeValSeven);
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TypeTag Type={this.state.TypePropOne}/>
        <TypeTag Type={this.state.TypePropTwo}/>
        <TypeTag Type={this.state.TypePropThree}/>
        <TypeTag Type={this.state.TypePropFour}/>
        <TypeTag Type={this.state.TypePropFive}/>
        <TypeTag Type={this.state.TypePropSix}/>
        <Text> {swchart[this.props.PrimaryType.toString()].length} </Text>
      </View>
    );
  }
}
