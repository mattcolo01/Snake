import { StyleSheet, Text, View } from 'react-native';

import Tile from './components/Tile';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.playground}>
        <Tile />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playground: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: 'green',
    alignItems: 'center',
  }
});