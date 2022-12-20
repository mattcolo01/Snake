import React from "react";
import { Button, View, StyleSheet } from "react-native";


export default class Navigation extends React.Component {

    render(){
        return (
            <View style={styles.container}>
                <Button title="←" onPress={this.props.dirChange.bind(this, -1)}/>
                <Button title="→" onPress={this.props.dirChange.bind(this, 1)}/>
                <Button title="↑" onPress={this.props.dirChange.bind(this, 2)}/>
                <Button title="↓" onPress={this.props.dirChange.bind(this, -2)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
    },
});