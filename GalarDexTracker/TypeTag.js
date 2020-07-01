import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

export default class PokedexList extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    var TypeString = this.props.Type;
    var StyleToUse = styles.NormalIcon;
    var ShowingWeakness = this.props.IsWeaknessTag;
    var ModifierStyle = styles.ModFontGood;

    if (ShowingWeakness)
    {
      ModifierStyle = styles.ModFontBad;
    }

    if (TypeString === "fire")
    {
      StyleToUse = styles.FireIcon;
    }
    else if (TypeString === "water")
    {
      StyleToUse = styles.WaterIcon;
    }
    else if (TypeString === "electric")
    {
      TypeString = "electr";
      StyleToUse = styles.ElectricIcon;
    }
    else if (TypeString === "grass")
    {
      StyleToUse = styles.GrassIcon;
    }
    else if (TypeString === "ice")
    {
      StyleToUse = styles.IceIcon;
    }
    else if (TypeString === "fighting")
    {
      TypeString = "FGHTING";
      StyleToUse = styles.FightIcon;
    }
    else if (TypeString === "poison")
    {
      StyleToUse = styles.PoisonIcon;
    }
    else if (TypeString === "ground")
    {
      StyleToUse = styles.GroundIcon;
    }
    else if (TypeString === "flying")
    {
      StyleToUse = styles.FlyingIcon;
    }
    else if (TypeString === "psychic")
    {
      TypeString = "psychc";
      StyleToUse = styles.PsychicIcon;
    }
    else if (TypeString === "bug")
    {
      StyleToUse = styles.BugIcon;
    }
    else if (TypeString === "rock")
    {
      StyleToUse = styles.RockIcon;
    }
    else if (TypeString === "ghost")
    {
      StyleToUse = styles.GhostIcon;
    }
    else if (TypeString === "dragon")
    {
      StyleToUse = styles.DragonIcon;
    }
    else if (TypeString === "dark")
    {
      StyleToUse = styles.DarkIcon;
    }
    else if (TypeString === "steel")
    {
      StyleToUse = styles.SteelIcon;
    }
    else if (TypeString === "fairy")
    {
      StyleToUse = styles.FairyIcon;
    }

    var TagInfo = null;
    if (TypeString !== "")
    {
      TagInfo = (
        <View>
          <View style={StyleToUse}>
            <Text style={styles.IconFont}>{TypeString.toUpperCase()}</Text>
          </View>
          <Text style={ModifierStyle}>{this.props.TypeFXMod}</Text>
        </View>
      );
    }

    return (
      <View style={{flexDirection: 'column', marginTop: 16}}>
        {TagInfo}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  IconFont: {
    fontSize: 10,
    color: 'white',
    width: 42,
    padding: 2,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 1,
  },
  ModFontGood: {
    fontSize: 12,
    color: 'green',
    marginTop: 3,
    marginLeft: -3,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 1,
  },
  ModFontBad: {
    fontSize: 12,
    color: 'red',
    marginTop: 3,
    marginLeft: -3,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 1,
  },
  NormalIcon: {
    backgroundColor: '#a8a97c',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  FireIcon: {
    backgroundColor: '#f7813c',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  WaterIcon: {
    backgroundColor: '#638eeb',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  ElectricIcon: {
    backgroundColor: '#fbd14c',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  GrassIcon: {
    backgroundColor: '#6ec95e',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  IceIcon: {
    backgroundColor: '#91d8d8',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  FightIcon: {
    backgroundColor: '#c7312b',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  PoisonIcon: {
    backgroundColor: '#a53e9c',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  GroundIcon: {
    backgroundColor: '#e3c171',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  FlyingIcon: {
    backgroundColor: '#aa8eeb',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  PsychicIcon: {
    backgroundColor: '#ff5786',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  BugIcon: {
    backgroundColor: '#a7b93c',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  RockIcon: {
    backgroundColor: '#baa146',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  GhostIcon: {
    backgroundColor: '#725795',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  DragonIcon: {
    backgroundColor: '#732ef1',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  DarkIcon: {
    backgroundColor: '#725849',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  SteelIcon: {
    backgroundColor: '#b8b8cf',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
  FairyIcon: {
    backgroundColor: '#e2a4db',
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
    marginRight: 5,
  },
});
