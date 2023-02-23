import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
