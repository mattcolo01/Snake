import React from "react";
import { Button, View, StyleSheet } from "react-native";

//Warning: deprecated
//Use third-party library "GestureRecognizer" instead
//Renderizza quattro bottoni per cambiare direzione. Props:
//-dirChange: azioni da eseguire quando viene premuto un qualsiasi pulsante (che invia come parametro la direzione ad esso assegnata)
export default class Navigation extends React.Component {

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.button} >
                    <Button title="←" onPress={this.props.dirChange.bind(this, -1)}/>
                </View>
                <View style={styles.button} >
                    <Button title="→" onPress={this.props.dirChange.bind(this, 1)}/>
                </View>
                <View style={styles.button} >
                    <Button title="↑" onPress={this.props.dirChange.bind(this, 2)}/>
                </View>
                <View style={styles.button} >
                    <Button title="↓" onPress={this.props.dirChange.bind(this, -2)}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
    },
    button: {
        padding: 5,
        aspectRatio: 1,
    }
});