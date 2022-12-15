import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.playground}>
        <Text>Snake</Text>
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