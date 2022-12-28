import React from "react";
import { View, Text, StyleSheet } from "react-native";

// classe Tile
// Renderizza una casella che può contenere un segmento di serpente, del cibo, o essere vuota
// Props:
// - content: "snake" per rappresentare il serpente, "food" per il cibo, null (o altro) se è vuota

export default class Tile extends React.Component{
    constructor (props) {
        super(props);
    }
    render(){
        return(
            <View style={
                this.props.content == 'snake' ?
                tile.snake :
                    this.props.content == 'food' ?
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
        backgroundColor: 'grey',
        borderRadius: 5,
        margin: 0,
    },
    empty: {
        width: 10,
        heigth: 10,
        aspectRatio: 1,
        backgroundColor: 'white',
        margin: 0,
    },
    food: {
        width: 10,
        heigth: 10,
        aspectRatio: 1,
        backgroundColor: 'brown',
        borderRadius: 5,
        margin: 0,
    },
})