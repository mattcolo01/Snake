import React from 'react';
import { Modal, Text, View, Button, StyleSheet } from 'react-native';

//Schermata di game over, contiene il relativo avviso e un pulsante per ripartire da capo. Props:
//-onRestart: azioni da eseguire quando viene premuto il pulsante "restart"
//-visible: boolean che mostra o nasconde la schermata
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