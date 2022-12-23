import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './components/Navigation';
import Tile from './components/Tile';
import GameOver from './components/GameOver';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-detect';

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
      tiles: t,   //matrice delle caselle, ognuna contenente un numero univoco e le proprie coordinate
      snakeDirection: null,   //integer che indica la direzione della testa, assume come valori + o - 1 e + o - 2
      gameOver: false,  //what else
      snake: [{ x: 15, y: 15 }],    //vettore dei segmenti del serpente, ognuno contenente le proprie coordinate
      food: { x: 10, y: 15 },   //coordinate dellaq casella contenente cibo
      moving: false,  //what else
      tick: null,   //per fermare e far partire il timer
      moved: true,  //dice se il serpente si è mosso dopo l'ultimo cambio di direzione (serve per cambiare una sola direzione alla volta)
    }

    this.toggleDirection=this.toggleDirection.bind(this);
  }

  //metodo richiamato quando l'utente cambia direzione, prima controlla se la direzione ricevuta è consentita e poi richiama il metodo per il movimento
  toggleDirection(dir){
    if(this.state.moved){
      if(!this.state.gameOver) {
        if(dir !== -this.state.snakeDirection) {
          this.setState({moved:false});
          this.setState(
            {snakeDirection: dir,} // , funzione da eseguire una volta aggiornato
          );
        }
        if(!this.state.moving){     //chiama movement solo la prima volta
          this.setState({moving:true,});
          this.movement();
        }
      }
    }
  }

  //metodo per il movimento del serpente, periodicamente controlla la direzione e riposiziona il serpente
  movement() {
    clearInterval(this.state.tick); //ferma l'eventuale movimento già in corso ogni volta che il metodo viene richiamato (quindi ogni volta che si cambia direzione)
    this.setState({
      tick: setInterval( () => {
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
        this.snakePosition(newX,newY);  //comunica le nuove coordinate per riposizionare il serpente
        if(this.state.gameOver) clearInterval(this.state.tick); //se l'utente perde fermo il movimento
      }, Math.max(300,1000-30*this.state.snake.length)), //a ogni cambio di direzione viene aumentata la velocità in base allo stato di avanzamento del gioco (quindi alla lunghezza del serpente)
    });
  }

  //metodo per riposizionare il serpente, riceve le coordinate della nuova casella
  snakePosition(x,y){
    let snake = [];
    if( x<0 || y<0 || x>29 || y>29 || this.hasSnake(x,y) ) this.setState({gameOver: true,}); //se la nuova casella è oltre il bordo o se il serpente si mangia la coda dichiara game over, che femerà il tick
    else if(this.getFood(x,y,true)) {
      snake= [{ x: x, y: y }].concat(this.state.snake.slice()); //se la nuova casella contiene cibo la aggiunge semplicemente al vettore serpente (in testa), che si allungherà di 1
    } else {
      snake= [{ x: x, y: y }].concat( this.state.snake.slice(0, this.state.snake.length-1)); //se la casella è vuota la aggiunge in testa al serpente ma toglie l'ultima, in modo che il serpente paia spostarsi ma senza allungarsi
    }
    this.setState({snake: snake, moved: true});
  }

  //metodo per controllare se una data casella (coordinate come parametri) contiene un segmento di serpente
  hasSnake(x,y){
    for(let i=0; i<this.state.snake.length; i++) {
      if(this.state.snake[i].x==x && this.state.snake[i].y==y)
        return true;
    }
    return false;
  }

  //metodo per controllare se una data casella (parametri x e y) contiene cibo e, eventualmente, mangiarlo
  //l'intenzione di mangiare o meno è specificata attraverso il parametro booleano eat (in quanto la funzione viene usata anche per renderizzare, momento in cui ovviamente non si mangia)
  getFood(x,y,eat){
    if(this.state.food.x == x && this.state.food.y == y) {
      let tx, ty;
      if(eat){
        do {
          tx=Math.floor(Math.random()*30);
          ty=Math.floor(Math.random()*30);
        } while (this.hasSnake(tx,ty));
        this.setState({ food: { x: tx, y: ty } });  //se la casella coneneva cibo e verrà mangiato, devo spawnare cibo in una nuova casella (randomica), controllando che già non ci sia il serpente
      }
      return true;
    } else return false;
  }

  //metodo restart, riporta lo stato alle condizioni iniziali in modo da ripartire a giocare
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
      <GestureRecognizer style={styles.container}
        onSwipeUp={this.toggleDirection.bind(this, 2)}
        onSwipeDown={this.toggleDirection.bind(this, -2)}
        onSwipeRight={this.toggleDirection.bind(this, 1)}
        onSwipeLeft={this.toggleDirection.bind(this, -1)} >
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
                        this.hasSnake(item.x,item.y) ?
                          "snake" :
                            this.getFood(item.x,item.y) ?
                              "food" : null
                        } key={item.num} />);
                    })
                  }
                </View>
              );
            } )}
            {/* <Navigation dirChange={this.toggleDirection}/> */}
          </View>
        </View>
      </GestureRecognizer>
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