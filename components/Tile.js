import React from "react";
import { View, Text, StyleSheet } from "react-native";

// classe Tile
// Renderizza una casella che può contenere un segmento di serpente, del cibo, o essere vuota
// Props:
// - content: null o 0 se è vuota, un numero maggiore di 0 se c'è il serpente, minore di zero se c'è cibo

export default class Tile extends React.Component{
    constructor (props) {
        super(props);
    }
    render(){
        return(
            <View style={
                this.props.content > 0?
                tile.snake :
                    this.props.content < 0 ?
                    tile.food : tile.empty
            }>
                <Text></Text>
            </View>
        );
    }
}

const tile=StyleSheet.create({
    snake:{
        width: 10,
        heigth: 10,
        aspectRatio: 1,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    empty: {
        width: 10,
        heigth: 10,
        aspectRatio: 1,
        backgroundColor: 'white',
    },
    food: {
        width: 10,
        heigth: 10,
        aspectRatio: 1,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
})