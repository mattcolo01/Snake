import React from 'react';
import { Modal, Text, View, Button, StyleSheet } from 'react-native';

class GameOver extends React.Component {
    constructor (props){
        super(props);
    }

    render(){
        return(
            <Modal animationType='slide' visible={this.props.visible}>
                <View style={styles.modal}>
                    <Text style={styles.text}>Game over</Text>
                    <View style={styles.restartButton} >
                        <Button title="Restart" onPress={this.props.onRestart} />
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles=StyleSheet.create({
    text: {
        fontSize: 25,
        textAlign: 'center',
        margin: 15,
    },
    restartButton: {
        alignItems: 'center',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default GameOver;