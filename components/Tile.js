import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Tile extends React.Component{
    render(){
        return(
            <View style={TSt.tile}>
                <Text>.</Text>
            </View>
        )
    }
}

const TSt=StyleSheet.create({
    tile:{
        width: 10,
        heigth: 10,
        backgroundColor: 'red',
    }
})