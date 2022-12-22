import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './components/Navigation';
import Tile from './components/Tile';
import GameOver from './components/GameOver';

export default class App extends React.Component {
  constructor(props){
    super(props);
    let t=new Array();
    let help=0;
    for(let y=0; y<30; y++) {
      t[y]=new Array();
      for(let x=0; x<30; x++) {
        t[y][x]={
          num: help++,
          x: x,
          y: y,
        }
      }
    }

    this.state={
      tiles: t,
      snakeDirection: null,
      gameOver: false,
      snake: [{ x: 15, y: 15 }],
      food: { x: 10, y: 15 },
      moving: false,
    }
    this.toggleDirection=this.toggleDirection.bind(this);
  }

  toggleDirection(dir){
    if(!this.state.gameOver) {
      if(dir !== -this.state.snakeDirection)
        this.setState(
          {snakeDirection: dir,} // , funzione da eseguire una volta aggiornato
        );
      
      if(!this.state.moving){     //chiama movement solo la prima volta
        this.setState({moving:true,});
        this.movement();
      }
    }
  }

  movement() {
    var tick=setInterval( () => {
      let newX,newY;
      switch(this.state.snakeDirection) {
        case -1:
          newY = this.state.snake[0].y;
          newX = (this.state.snake[0].x)-1;
          break;
        case 1:
          newY = this.state.snake[0].y;
          newX = (this.state.snake[0].x)+1;
          break;
        case -2:
          newY = (this.state.snake[0].y)+1;
          newX = this.state.snake[0].x;
          break;
        case 2:
          newY = (this.state.snake[0].y)-1;
          newX = this.state.snake[0].x;
          break;
      };
      this.snakePosition(newX,newY);
      if(this.state.gameOver) clearInterval(tick);
    }, 800);
  }

  snakePosition(x,y){
    let snake = [];
    if( x<0 || y<0 || x>29 || y>29 || this.hasSnake(x,y) ) this.setState({gameOver: true,});
    else if(this.getFood(x,y,true)) {
      snake= [{ x: x, y: y }].concat(this.state.snake.slice());
    } else {
      snake= [{ x: x, y: y }].concat( this.state.snake.slice(0, this.state.snake.length-1));
    }
    this.setState({snake: snake, });
  }

  hasSnake(x,y){
    for(let i=0; i<this.state.snake.length; i++) {
      if(this.state.snake[i].x==x && this.state.snake[i].y==y)
        return true;
    }
    return false;
  }

  getFood(x,y,eat){
    if(this.state.food.x == x && this.state.food.y == y) {
      let tx, ty;
      if(eat){
        do {
          tx=Math.floor(Math.random()*30);
          ty=Math.floor(Math.random()*30);
        } while (this.hasSnake(tx,ty));
        this.setState({ food: { x: tx, y: ty } });
      }
      return true;
    } else return false;
  }

  restart(){
    this.setState({
      snakeDirection: null,
      gameOver: false,
      snake: [{ x: 15, y: 15 }],
      food: { x: 10, y: 15 },
      moving: false,
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <GameOver
          visible={this.state.gameOver}
          onRestart={ () =>{
            this.restart();
          } }/>
        <View style={styles.playground}>
          {this.state.tiles.map( (arr) => {
            return (
              <View key={arr[0].num} style={styles.row} >
                {
                  arr.map( (item) => {
                    return (<Tile content={
                      this.hasSnake(item.x, item.y) ?
                        "snake" :
                          this.getFood(item.x,item.y) ?
                            "food" : null
                      } key={item.num} />);
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