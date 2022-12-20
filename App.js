import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './components/navigation';

import Tile from './components/Tile';

export default class App extends React.Component {
  constructor(props){
    super(props);
    let t=new Array();
    let help=0;
    for(let i=0; i<30; i++) {
      t[i]=new Array();
      for(let j=0; j<30; j++) {
        t[i][j]={
          num: help++,
          val: null,
        }
      }
    }

    t[15][15].val=-1;

    //Stato:
    //- tiles: matrice degli stati delle singole caselle, per ora contiene l'indice ma sarà da popolare con (anche) cosa c'è dentro
    this.state={
      tiles: t,
      snakeDirection: 2,
    }
    //console.log(this.state.tiles);
    this.toggleDirection=this.toggleDirection.bind(this);
  }

  toggleDirection(dir){
    if(dir !== -this.state.snakeDirection)
      this.setState(
        {snakeDirection: dir,},
        () => {console.log(this.state.snakeDirection)}
      );
    this.movement();
  }

  movement() {
    setInterval( () => {
      let temp=this.state.tiles;
      temp[Math.floor(Math.random()*30)][Math.floor(Math.random()*30)].val = 1;
      this.setState({tiles: temp,});
    }, 1000)
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.playground}>
          {this.state.tiles.map( (arr) => {
            return (
              <View key={arr[0].num} style={styles.row} >
                {
                  //console.log(arr)
                  arr.map( (item) => {
                    //console.log(item);
                    return (<Tile content={item.val} key={item.num} />);
                  })
                }
              </View>
            );
          } )}
          <Navigation dirChange={this.toggleDirection}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playground: {
    width: 304,
    height: 304,
    borderWidth: 2,
    borderColor: 'green',
    alignItems: 'center',
    flexDirection: 'column',
  },
  row: {
    width: 300,
    height: 10,
    flexDirection: 'row',
  }
});

//TO DO: sistemare un po' lo styling (in tutte le classi)